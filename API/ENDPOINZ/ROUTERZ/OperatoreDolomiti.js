const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const Notifica = require('../../MODELLI/notifica');
const Utente = require('../../MODELLI/utente');

router.use(express.json());

router.get('/segnalazioni', async (req,  res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find().exec();
    if(lista_segn.length == 0){
        res.status(200).send('Non sono presenti segnalazioni al momento');
    }else{
        res.status(200).json(lista_segn);
    }
})

router.patch('/segnalazioni/:segnalazioneId', async (req, res) => {
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

router.delete('/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    const segnalazione = await Segnalazione.findOneAndDelete({ segnalazioneId: segnalazioneId });
    if(!segnalazione){
        res.status(404).send( { error: 'Segnalazione non trovata.' });
        return
    }
    res.status(204).send();
})