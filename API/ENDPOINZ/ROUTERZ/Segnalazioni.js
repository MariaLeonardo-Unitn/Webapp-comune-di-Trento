const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const Utente = require('../../MODELLI/utente');

router.use(express.json());

router.post('/', async (req, res) => {
    let utenteUrl = req.body.utente;
    let segnalazioneUrl = req.body.segnalazione;
    if(!utenteUrl){
        return res.status(400).json({error: 'Utente non specificato'});
    }
    if(!segnalazioneUrl){
        return res.status(400).json({error: 'Segnalazione non specificata'})
    }
    let idUtente = utenteUrl.substring(utenteUrl.lastIndexOf('/') + 1);
    let utente = await Utente.findOne({
        utenteId: idUtente
    }).exec();
    if(utente == null){
        return res.status(400).json({ error: 'Utente non esistente' });
    }
    let idSegnalazione = segnalazioneUrl.substring(segnalazioneUrl.lastIndexOf('/') + 1);
    let segnalazione = await Utente.findOne({
        segnalazioneId: idSegnalazione
    }).exec();
    if(segnalazione != null){
        return res.status(400).json({error: 'Segnalazione già esistente'});
    }
    let nuovaSegnalazione = new Segnalazione({
        segnalazioneId: idSegnalazione,
        utenteId: idUtente,
        luogo: req.body.luogo,
        descrizione: req.body.descrizione,
        stato: req.body.stato || 'attiva',
        foto: req.body.foto,
        posizione: {
            latitudine: req.body.latitudine,
            longitudine: req.body.longitudine
        }
    });
    nuovaSegnalazione = await nuovaSegnalazione.save();
    let id = nuovaSegnalazione.id;
    return res.location('/api/segnalazioni/' + id).status(201).send();
});

router.get('/utenteId', async (req, res) => {
    let lista_segn;
    if(req.query.utenteId){
        lista_segn = await Segnalazione.find({
            utenteId: req.query.utenteId
        }).exec()
        res.status(200).json(lista_segn);
    }else{
        res.status(404).send("Non sono presenti segnalazioni nello storico.");
    }
})

router.get('/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    let segnalazione = await Segnalazione.findOne({ segnalazioneId }).exec();
    if(segnalazione){
        res.status(200).json(segnalazione);
    }else{
        res.status(400).send("Segnalazione inesistente.");
    }
});


module.exports = router;