const express = require('express');
const router = express.Router();
const User = require('../../MODELLI/user');
const jwt = require('jsonwebtoken');


// Specifiche
router.use(express.json());

// Endpoint di login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        const token = jwt.sign(
            {
                email: user.email,
                role: user.role,
                permissions: user.permissions,
                issuedAt: Date.now(),
            },
            process.env.SECRET_KEY,
            { expiresIn: '60m' }
        );

        res.json({ token, role: user.role, permissions: user.permissions });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore interno al server' });
    }
});

// Middleware per autenticazione basato su JWT
//ricordarsi quindi che quando si fa una richiesta che vuole l'autenticazione (per esempio get dei calendari) bisogna passargli il proprio token 
//che si riceve da una response di login, e bisogna inserirlo in un header della richiesta che si vuole eseguire. Questo header DEVE chiamarsi "access-token"
//figata allucinante
function authenticateToken(req, res, next) {
    var token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Token mancante.'});

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valido'});
        else {
            req.user = user;
            next();
        }
    });
}

// Endpoint per ottenere le informazioni dell'utente autenticato
router.get('/me', authenticateToken, (req, res) => {
    res.json({
        user_id: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions,
    });
});

// Endpoint di registrazione (sign-up)
router.post('/signup', async (req, res) => {
    const { email, password, name, role, secret_token } = req.body;

    try {
        // Validazione del ruolo e token segreto
        if (['operatore_Dolomiti', 'operatore_comune'].includes(role)) {
            if (!secret_token) {
                return res.status(400).json({ error: 'Token segreto richiesto per registrarsi come operatore' });
            }

            if (secret_token != process.env.DOLOMITI_TOKEN || secret_token != process.env.COMUNE_TOKEN) {
                return res.status(400).json({ error: 'Token segreto non valido' });
            }
        }

        // Creazione del nuovo utente nel database
        const newUser = new User({
            email: email,
            password: password,
            name: name,
            role: role,
            permissions: role === 'cittadino'
                ? ['visualizza_rifiuti']
                : role === 'operatore_Dolomiti'
                ? ['gestisci_calendari']
                : role === 'operatore_comune'
                ? ['gestisci_disposizioni']
                : [],
        });

        await newUser.save();

        res.status(201).json({ message: 'Registrazione avvenuta con successo', user_id: email });
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ error: 'Errore interno al server' });
    }
});

module.exports = {router, authenticateToken};
