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

router.post('/segnalazioni', async (req, res) => {
    const { utenteId, message, segnalazioneId } = req.body;
    if (!utenteId || !message) {
        return res.status(400).json({ error: 'Mancano i parametri obbligatori (id utente o messaggio).' });
    }
    const utente = await Utente.findOne({ utenteId: utenteId });
    if(!utente){
        return res.status(404).send({ error: 'Utente non trovato. '});
    }
    if(segnalazioneId){
        const segnalazione =await Segnalazione.findOne({ segnalazioneId: segnalazioneId });
        if(!segnalazione){
            return res.status(404).send({ error: 'Segnalazione non trovata' });
        }
    }
    const nuovaNotifica = new Notifica({
        utenteId: utenteId,
        message: message,
        segnalazioneId: segnalazioneId || null
    })
    const notificaSalvata = await nuovaNotifica.save();
    res.status(201).json(notificaSalvata);
});

router.get('/prenotazioni', async (req, res) => {
    let lista_pren;
    lista_pren = await Prenotazione.find();
    if(lista_segn.length == 0){
        return res.status(404).send( 'Non è presente nessuna prenotazione.');
    }
    res.status(200).json(lista_segn);
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