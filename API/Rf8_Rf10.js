const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Libreria per connettersi a MongoDB
const uri = 'mongodb+srv://gabrielegonzato04:trentocleancity@cluster0.mdllo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const User = require('./modelli/user');
const app = express();
const port = 3000;

app.use(express.json());

const SECRET_KEY = 'supersegreto123'; // Chiave segreta per i JWT (da mantenere sicura)

// Connessione al database MongoDB
mongoose.connect(uri);
const SECRET_TOKEN = 17;

// Endpoint di login
app.post('/api/auth/login', async (req, res) => {
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
            SECRET_KEY,
            { expiresIn: '60m' }
        );

        res.json({ token, role: user.role, permissions: user.permissions });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore interno al server' });
    }
});

// Middleware per autenticazione basato su JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token mancante' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valido' });
        req.user = user;
        next();
    });
}

// Endpoint per ottenere le informazioni dell'utente autenticato
app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({
        user_id: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions,
    });
});

// Endpoint di registrazione (sign-up)
// Endpoint di registrazione (sign-up)
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name, role, secret_token } = req.body;

    try {
        // Validazione del ruolo e token segreto
        if (['operatore_Dolomiti', 'operatore_comune'].includes(role)) {
            if (!secret_token) {
                return res.status(400).json({ error: 'Token segreto richiesto per registrarsi come operatore' });
            }

            if (secret_token != SECRET_TOKEN) {
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


app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
