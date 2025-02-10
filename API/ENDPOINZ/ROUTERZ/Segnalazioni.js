const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
<<<<<<< HEAD
const Notifica = require('../../MODELLI/notifica');
const Utente = require('../../MODELLI/utente');

router.use(express.json());

router.get('/utente', async (req, res) => {
=======
const Utente = require('../../MODELLI/utente');
const { authenticateToken, authenticateComRole } = require('./Authentication');

router.use(express.json());

router.post('/', authenticateToken, async (req, res) => {
    let utenteId = req.body.utente;
    let segnalazioneUrl = req.body.segnalazione;
    if(!utenteId){
        return res.status(403).json({error: 'Utente non specificato'});
    }
    if(!segnalazioneUrl){
        return res.status(405).json({error: 'Segnalazione non specificata'})
    }
    
    let utente = await Utente.findOne({ utenteId: utenteId }).exec();
    if (!utente) {
        return res.status(406).json({ error: 'Utente non esistente' });
    }

    let lastSegn = await Segnalazione.findOne().sort({ segnalazioneId: -1 }).collation({ locale: "en", numericOrdering: true }).exec();
    let idSegnalazione = lastSegn ? ( parseInt(lastSegn.segnalazioneId, 10 ) + 1 ).toString() : 1;

    let segnalazione = await Segnalazione.findOne({ segnalazioneId: idSegnalazione }).exec();
    if(segnalazione != null){
        return res.status(409).json({error: 'Segnalazione già esistente'});
    }
    let nuovaSegnalazione = new Segnalazione({
        segnalazioneId: idSegnalazione,
        utenteId: utenteId,
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
    let id = nuovaSegnalazione.segnalazioneId;
    return res.location('/api/segnalazioni/' + id).status(201).json(nuovaSegnalazione);
});

router.get('/utenteId', authenticateToken, async (req, res) => {
>>>>>>> APIfolder
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

<<<<<<< HEAD
router.get('/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    let segnalazione = await Segnalazione.findOne({ segnalazioneId }).exec();
=======
router.get('/:segnalazioneId', authenticateComRole, async (req, res) => {

    const segnalazioneId = req.params.segnalazioneId;
    let segnalazione = await Segnalazione.findOne({ segnalazioneId }).exec();

>>>>>>> APIfolder
    if(segnalazione){
        res.status(200).json(segnalazione);
    }else{
        res.status(400).send("Segnalazione inesistente.");
    }
});

<<<<<<< HEAD
router.post('/', async (req, res) => {
    let utenteUrl = req.body.utente;
    let segnalazioneUrl = req.body.segnalazione;
    if(!utenteUrl){
        res.status(400).json({error: 'Utente non specificato'});
    return
    }
    if(!segnalazioneUrl){
        res.status(400).json({error: 'Segnalazione non specificata'})
        return
    }
    let idUtente = utenteUrl.substring(utenteUrl.lastIndexOf('/') + 1);
    let utente = await Utente.findOne({
        utenteId: idUtente
    }).exec();
    if(utente == null){
        res.status(400).json({ error: 'Utente non esistente' });
        return
    }
    let idSegnalazione = segnalazioneUrl.substring(segnalazioneUrl.lastIndexOf('/') + 1);
    let segnalazione = await Utente.findOne({
        segnalazioneId: idSegnalazione
    }).exec();
    if(segnalazione != null){
        res.status(400).json({error: 'Segnalazione già esistente'});
        return
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
    res.location('/api/segnalazioni/' + id).status(201).send();
})
=======

module.exports = router;
>>>>>>> APIfolder
