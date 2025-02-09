const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const jwt = require('jsonwebtoken');

router.use(express.json());


router.get('/segnalazioni', async (req,  res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find().exec();
    if(lista_segn.length == 0){
        return res.status(404).send('Non sono presenti segnalazioni al momento');
    }else{
        return res.status(200).json(lista_segn);
    }
});

router.patch('/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    console.log(segnalazioneId);
    const { stato } = req.body;
    const statiPossibili = ['attiva', 'presa in carico', 'completata'];
    if(!statiPossibili.includes(stato)){
        return res.status(400).send( { error: 'Stato non valido.'} );
    }
    const segnalazione = await Segnalazione.findOneAndUpdate(
        { segnalazioneId: segnalazioneId },
        { stato: stato },
        { new: true}
    );
    console.log(segnalazione);
    if(!segnalazione){
        return res.status(404).send({ error: 'Segnalazione non trovata '});
    }
    res.status(200).json(segnalazione);
});

router.delete('/segnalazioni/:segnalazioneId', async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    const segnalazione = await Segnalazione.findOneAndDelete({ segnalazioneId: segnalazioneId });
    if(!segnalazione){
        return res.status(404).send( { error: 'Segnalazione non trovata.' });
    }
    res.status(204).send();
});

module.exports = router;