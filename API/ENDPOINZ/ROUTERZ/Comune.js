const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const Prenotazione = require('../../MODELLI/prenotazione');
const Notifica = require('../../MODELLI/notifica');
const Utente = require('../../MODELLI/utente');
const jwt = require('jsonwebtoken');

router.use(express.json());

router.get('/segnalazioni', async (req, res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find({stato: { $in: ['presa in carico', 'completata']}});
    if(lista_segn.length == 0){
        return res.status(404).send( 'Non è presente nessuna segnalazione.');
    }
    res.status(200).json(lista_segn);
});

router.get('/prenotazioni', async (req, res) => {
    let lista_pren;
    lista_pren = await Prenotazione.find();
    if(lista_pren.length == 0){
        return res.status(404).send( 'Non è presente nessuna prenotazione.');
    }
    res.status(200).json(lista_pren);
});

router.delete('/prenotazione/:prenotazioneId', async (req, res) => {
    const prenotazioneId = req.params.prenotazioneId;
    const prenotazione = await Prenotazione.findOneAndDelete({ prenotazioneId: prenotazioneId });
    if(!prenotazione){
        return res.status(404).send( { error: 'Prenotazione non trovata.' });
    }
    return res.status(204).send();
});

module.exports = router;