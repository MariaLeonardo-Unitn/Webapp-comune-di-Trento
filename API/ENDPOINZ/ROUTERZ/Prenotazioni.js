const express = require('express');
const router = express.Router();
const Prenotazione = require('../../MODELLI/prenotazione');
const Utente = require('../../MODELLI/utente');
const PuntoRitiro = require('../../MODELLI/puntoRitiro');


router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { tipoSacchetto, quantita, puntoRitiro } = req.body;

        const utente = await Utente.findOne({ utenteId: req.Utente.utenteId }).exec();
        if (!utente) {
            return res.status(406).json({ error: 'Utente non esistente' });
        }

        const pR = await PuntoRitiro.findOne({ puntoRitiroId: puntoRitiro }).exec();
    
        if (!pR) {
            return res.status(407).json({ error: 'Punto di ritiro non esistente' });
        }

        let lastPren = await Prenotazione.findOne().sort({ prenotazioneId: -1 }).exec();
        let newPrenId = lastPren ? ( parseInt(lastPren.prenotazioneId, 10 ) + 1 ).toString() : 1;
        

        const nuovaPrenotazione = new Prenotazione({
            prenotazioneId: newPrenId,
            utente, 
            tipoSacchetto,
            quantita,
            pR, 
            stato: "in attesa" 
        });

        await nuovaPrenotazione.save();

        const id = nuovaPrenotazione.id;
        return res.location('/api/prenotazioni/' + id).status(201).send();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Errore durante la creazione della prenotazione' });
    }
});

module.exports = router;