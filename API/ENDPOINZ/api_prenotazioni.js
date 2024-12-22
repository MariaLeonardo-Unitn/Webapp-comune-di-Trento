const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretKey = process.env.JWT_SECRET;

function generateAccessToken(userId) {
  return jwt.sign({ userId }, secretKey, { algorithm: 'HS256' });
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader
 && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'HS256', (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user (check credentials against your database)
  const user = await User.findOne({ username }).select('+password');
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({   
 message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = generateAccessToken(user._id);

  res.json({ token });
});

app.post('/bookings', authMiddleware, async (req, res) => {
    try {
        const { tipoSacchetto, quantita, puntoRitiro } = req.body;

        const nuovaPrenotazione = new Prenotazione({
            utente: req.user._id,
            tipoSacchetto,
            quantita,
            puntoRitiro
        });

        await nuovaPrenotazione.save();

        // Invia notifica 
        res.status(201).json(nuovaPrenotazione);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante la creazione della prenotazione' });
    }
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});
