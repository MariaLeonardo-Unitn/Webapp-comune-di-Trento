const express = require('express');
const router = express.Router();
const Prenotazione = require('../../MODELLI/prenotazione');
const PuntoRitiro = require('../../MODELLI/puntoRitiro');
const Utente = require('../../MODELLI/utente');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { tipoSacchetto, quantita, dataPrenotazione, puntoRitiro } = req.body;

        let lastPren = await Prenotazione.findOne().sort({ prenotazioneId: -1 }).collation({ locale: "en", numericOrdering: true }).exec();
        let newPrenId = lastPren ? ( parseInt(lastPren.prenotazioneId, 10 ) + 1 ).toString() : 1;
        let pR = await PuntoRitiro.findOne({nome: puntoRitiro}).exec();
        const utente = await Utente.findOne({ utenteId: req.Utente.utenteId }).exec();
        if (!utente) {
            return res.status(406).json({ error: 'Utente non esistente' });
        }
        if (!pR) {
            return res.status(407).json({ error: 'Punto di ritiro non esistente' });
        }
        const nuovaPrenotazione = new Prenotazione({
            prenotazioneId: newPrenId,
            utente: utente,
            tipoSacchetto,
            quantita,
            dataPrenotazione,
            pR
        });

        await nuovaPrenotazione.save();

        res.status(201).json(nuovaPrenotazione);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante la creazione della prenotazione' });
    }
});

module.exports = router;