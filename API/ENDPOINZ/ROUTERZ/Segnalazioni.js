const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
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

router.get('/:segnalazioneId', authenticateComRole, async (req, res) => {

    const segnalazioneId = req.params.segnalazioneId;
    let segnalazione = await Segnalazione.findOne({ segnalazioneId }).exec();

    if(segnalazione){
        res.status(200).json(segnalazione);
    }else{
        res.status(400).send("Segnalazione inesistente.");
    }
});

module.exports = router;