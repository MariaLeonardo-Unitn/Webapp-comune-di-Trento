const express = require('express');
const router = express.Router();
const Utente = require('../../MODELLI/utente');
const jwt = require('jsonwebtoken');


// Specifiche
router.use(express.json());


// Middleware per autenticazione 
//ricordarsi quindi che quando si fa una richiesta che vuole l'autenticazione (per esempio get dei calendari) bisogna passargli il proprio token 
//che si riceve da una response di login, e bisogna inserirlo in un header della richiesta che si vuole eseguire. Questo header DEVE chiamarsi "access-token"
function authenticateToken(req, res, next) {
    let token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Token mancante.'});
    
    jwt.verify(token, process.env.SECRET_KEY, (err, Utente) => {
        if (err) return res.status(403).json({ error: 'Token non valido'});
        else {
            req.Utente = Utente;
            next();
        }
    });
}
function authenticateDolRole(req, res, next) {
    let token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Token mancante.' });
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valido' });
        req.user = user; 
        if (req.user.role === 'operatore_Dolomiti') {
            next();
        } else {
            return res.status(409).json({ error: 'Operazione non consentita' });
        }
    });
}
function authenticateComRole(req, res, next) {
    let token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Token mancante.' });
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valido' });
        req.user = user; 
        if (req.user.role === 'operatore_comune') {
            next();
        } else {
            return res.status(409).json({ error: 'Operazione non consentita' });
        }
    });
}

// Endpoint di login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const User = await Utente.findOne({ email, password });
        if (!User) 
            return res.status(401).json({ error: 'Credenziali non valide' });

        const token = jwt.sign(
            {
                email: User.email,
                role: User.role,
                permissions: User.permissions,
                issuedAt: Date.now(),
            },
            process.env.SECRET_KEY,
            { expiresIn: '60m' }
        );
        res.json({ 
            token,
            utenteId: User.utenteId,
            role: User.role,
            permissions: User.permissions
        });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore interno al server' + error  });
    }
});

// Endpoint per ottenere le informazioni dell'utente autenticato
router.get('/me', authenticateToken, (req, res) => {
    res.json({
        Utente_id: req.Utente.utenteId,
        role: req.Utente.role,
        permissions: req.Utente.permissions,
    });
});

// Endpoint di registrazione (sign-up)
router.post('/signup', async (req, res) => {
    const { nome, cognome, codiceFiscale, email, password, role, secret_token } = req.body;

    try {
        // Validazione del ruolo e token segreto
        if (['operatore_Dolomiti', 'operatore_comune'].includes(role)) {
            if (!secret_token) {
                return res.status(400).json({ error: 'Token segreto richiesto per registrarsi come operatore' });
            }

            if (role === "operatore_Dolomiti" && secret_token != process.env.DOLOMITI_TOKEN) {
                return res.status(400).json({ error: 'Token segreto non valido' });
            }
            if (role === "operatore_comune" && secret_token != process.env.COMUNE_TOKEN) {
                return res.status(400).json({ error: 'Token segreto non valido' });
            }
        }
        let lastUser = await Utente.findOne().sort({ utenteId: -1 }).exec();
        let newUtenteId = lastUser ? ( parseInt(lastUser.utenteId, 10 ) + 1 ).toString() : 1;

        // Creazione del nuovo utente nel database
        const newUtente = new Utente({
            utenteId: newUtenteId,
            nome: nome,
            cognome: cognome,
            codiceFiscale: codiceFiscale,
            email: email,
            password: password,
            role: role,
            permissions: role === 'cittadino'
                ? ['visualizza_rifiuti']
                : role === 'operatore_Dolomiti'
                ? ['gestisci_calendari']
                : role === 'operatore_comune'
                ? ['gestisci_disposizioni']
                : [],
        });

        await newUtente.save();

        res.status(201).json({ message: 'Registrazione avvenuta con successo', utenteId: newUtenteId });
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ error: 'Errore interno al server' });
    }
});

module.exports = {router, authenticateToken, authenticateDolRole, authenticateComRole};
