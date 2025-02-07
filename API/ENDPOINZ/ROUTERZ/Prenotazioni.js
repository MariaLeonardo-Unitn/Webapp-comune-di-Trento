const express = require('express');
const router = express.Router();
const Prenotazione = require('../../MODELLI/prenotazione');

router.post('/', async (req, res) => {
    try {
        const { tipoSacchetto, quantita, puntoRitiro } = req.body;

        const nuovaPrenotazione = new Prenotazione({
            utente: req.user._id,
            tipoSacchetto,
            quantita,
            puntoRitiro
        });

        await nuovaPrenotazione.save();

        res.status(201).json(nuovaPrenotazione);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante la creazione della prenotazione' });
    }
});

module.exports = router;