const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const Notifica = require('../../MODELLI/notifica');
const Utente = require('../../MODELLI/utente');

router.use(express.json());

router.get('/segnalazioni', async (req, res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find({stato: { $in: ['presa in carico', 'completata']}});
    if(lista_segn.length == 0){
        res.status(404).send( 'Non è presente nessuna segnalazione.');
        return
    }
    res.status(200).json(lista_segn);
})

router.post('/segnalazioni', async (req, res) => {
    const { utenteId, message, segnalazioneId } = req.body;
    if (!utenteId || !message) {
        return res.status(400).json({ error: 'Mancano i parametri obbligatori (id utente o messaggio).' });
    }
    const utente = await Utente.findOne({ utenteId: utenteId });
    if(!utente){
        res.status(404).send({ error: 'Utente non trovato. '});
        return
    }
    if(segnalazioneId){
        const segnalazione =await Segnalazione.findOne({ segnalazioneId: segnalazioneId });
        if(!segnalazione){
            res.status(404).send({ error: 'Segnalazione non trovata' });
            return
        }
    }
    const nuovaNotifica = new Notifica({
        utenteId: utenteId,
        message: message,
        segnalazioneId: segnalazioneId || null
    })
    const notificaSalvata = await nuovaNotifica.save();
    res.status(201).json(notificaSalvata);
})