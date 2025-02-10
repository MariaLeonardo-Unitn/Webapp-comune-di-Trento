const express = require('express');
const router = express.Router();
const multer = require('multer');
const Segnalazione = require('../../MODELLI/segnalazione');
const Utente = require('../../MODELLI/utente');
const { authenticateToken, authenticateComRole } = require('./Authentication');

router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', authenticateToken, upload.single('photo'), async (req, res) => {
    let motivo = req.body.reason; 
    let latitudine = parseFloat(req.body.lat);
    let longitudine = parseFloat(req.body.lng);
    if (!motivo) {
        return res.status(405).json({ error: 'Motivo della segnalazione non specificato' });
    }

    let lastSegn = await Segnalazione.findOne().sort({ segnalazioneId: -1 }).collation({ locale: "en", numericOrdering: true }).exec();
    let idSegnalazione = lastSegn ? ( parseInt(lastSegn.segnalazioneId, 10 ) + 1 ).toString() : "1";

    let segnalazione = await Segnalazione.findOne({ segnalazioneId: idSegnalazione }).exec();
    if(segnalazione != null){
        return res.status(409).json({error: 'Segnalazione già esistente'});
    }
    const fotoBase64 = req.file ? req.file.buffer.toString('base64') : null;
    let nuovaSegnalazione = new Segnalazione({
        segnalazioneId: idSegnalazione,
        utenteId: req.Utente.utenteId,
        descrizione: motivo,
        stato: 'attiva',
        foto: fotoBase64,
        posizione: {
            latitudine: latitudine,
            longitudine: longitudine
        }
    });
    nuovaSegnalazione = await nuovaSegnalazione.save();
    return res.location('/api/segnalazioni/' + idSegnalazione).status(201).json(nuovaSegnalazione);
});

router.post('/anonime', upload.single('photo'), async (req, res) => {
    let motivo = req.body.reason; 
    let latitudine = parseFloat(req.body.lat);
    let longitudine = parseFloat(req.body.lng);
    if (!motivo) {
        return res.status(405).json({ error: 'Motivo della segnalazione non specificato' });
    }

    let lastSegn = await Segnalazione.findOne().sort({ segnalazioneId: -1 }).collation({ locale: "en", numericOrdering: true }).exec();
    let idSegnalazione = lastSegn ? ( parseInt(lastSegn.segnalazioneId, 10 ) + 1 ).toString() : "1";

    let segnalazione = await Segnalazione.findOne({ segnalazioneId: idSegnalazione }).exec();
    if(segnalazione != null){
        return res.status(409).json({error: 'Segnalazione già esistente'});
    }
    const fotoBase64 = req.file ? req.file.buffer.toString('base64') : null;
    let nuovaSegnalazione = new Segnalazione({
        segnalazioneId: idSegnalazione,
        descrizione: motivo,
        stato: 'attiva',
        foto: fotoBase64,
        posizione: {
            latitudine: latitudine,
            longitudine: longitudine
        }
    });
    nuovaSegnalazione = await nuovaSegnalazione.save();
    return res.location('/api/segnalazioni/' + idSegnalazione).status(201).json(nuovaSegnalazione);
});

router.get('/:utenteId', authenticateToken, async (req, res) => {
    if(req.query.utenteId){
        let lista_segn = await Segnalazione.find({
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