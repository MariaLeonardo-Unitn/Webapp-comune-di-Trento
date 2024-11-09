const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

const SECRET_KEY = 'supersegreto123'; // Chiave segreta per i JWT (da mantenere sicura)

// Finti utenti per l'esempio (normalmente sarebbe un database)
const utenti = [
    { email: 'cittadino@example.com', password: 'password123', role: 'cittadino', permissions: ['visualizza_rifiuti'] },
    { email: 'operatore.dolomiti@example.com', password: 'password456', role: 'operatore_Dolomiti', permissions: ['gestisci_calendari'] },
    { email: 'operatore.comune@example.com', password: 'password789', role: 'operatore_comune', permissions: ['gestisci_disposizioni'] }
];
//servirà un database contenente tutti gli utenti, aggiungibili da un sign-in


// Endpoint di login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = utenti.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const token = jwt.sign(
        {
            email: user.email,
            role: user.role,
            permissions: user.permissions,
            issuedAt: Date.now()
        },
        SECRET_KEY,
        { expiresIn: '30m' }
    );

    res.json({ token, role: user.role, permissions: user.permissions });
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
        permissions: req.user.permissions
    });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
