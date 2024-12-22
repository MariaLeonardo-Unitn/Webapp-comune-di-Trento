const express = require('express');
const app = express();
const Segnalazione = require('../MODELLI/segnalazione');
const Notifica = require('../MODELLI/notifica');
const Utente = require('../MODELLI/utente');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://gabrielegonzato04:trentocleancity@cluster0.mdllo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri);
const jwt = require('jsonwebtoken');
const router = express.Router();
const port = 3000;

app.get('/api/segnalazioni/utente', async (req, res) => {
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

app.get('/api/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    let segnalazione = await Segnalazione.findOne({ segnalazioneId }).exec();
    if(segnalazione){
        res.status(200).json(segnalazione);
    }else{
        res.status(400).send("Segnalazione inesistente.");
    }
});

app.post('/api/segnalazioni', async (req, res) => {
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

app.get('/api/operatore_dol/segnalazioni', async (req,  res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find().exec();
    if(lista_segn.length == 0){
        res.status(200).send('Non sono presenti segnalazioni al momento');
    }else{
        res.status(200).json(lista_segn);
    }
})

app.patch('/api/operatore_dol/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    const { stato } = req.body;
    const statiPossibili = ['attiva', 'presa in carico', 'completata'];
    if(!statiPossibili.includes(stato)){
        res.status(400).send( { error: 'Stato non valido.'} );
        return
    }
    const segnalazione = await Segnalazione.findOneAndUpdate(
        { segnalazioneId: segnalazioneId },
        { stato: stato },
        { new: true}
    );
    if(!segnalazione){
        res.status(404).send({ error: 'Segnalazione non trovata '});
        return
    }
    res.status(200).json(segnalazione);
})

app.delete('/api/operatore_dol/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    const segnalazione = await Segnalazione.findOneAndDelete({ segnalazioneId: segnalazioneId });
    if(!segnalazione){
        res.status(404).send( { error: 'Segnalazione non trovata.' });
        return
    }
    res.status(204).send();
})

app.get('/api/operatore_com/segnalazioni', async (req, res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find({stato: { $in: ['presa in carico', 'completata']}});
    if(lista_segn.length == 0){
        res.status(404).send( 'Non è presente nessuna segnalazione.');
        return
    }
    res.status(200).json(lista_segn);
})

app.post('/api/operatore_com/segnalazioni', async (req, res) => {
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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})