const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
const Notifica = require('../../MODELLI/notifica');
const Utente = require('../../MODELLI/utente');

router.use(express.json());


function authenticateRoleViaToken(req, res, next) {
    let token = req.headers['access-token'];
    if (!token) return res.status(401).json({ error: 'Token mancante.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valido' });
        req.user = user; 
        if (req.user.role === 'operatore_Dolomiti') {
            next();
        } else {
            return res.status(409).json({ error: 'Operazione non consentita' });
        }
    });
}



router.get('/api/operatore_dol/segnalazioni', authenticateRoleViaToken, async (req,  res) => {
    let lista_segn;
    lista_segn = await Segnalazione.find().exec();
    if(lista_segn.length == 0){
        res.status(200).send('Non sono presenti segnalazioni al momento');
    }else{
        res.status(200).json(lista_segn);
    }
});

router.patch('/api/operatore_dol/segnalazioni/:segnalazioneId', authenticateRoleViaToken, async (req, res) => {
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
});

router.delete('/api/operatore_dol/segnalazioni/:segnalazioneId', authenticateRoleViaToken, async (req, res) => {
    const segnalazioneId = req.params.segnalazioneId;
    const segnalazione = await Segnalazione.findOneAndDelete({ segnalazioneId: segnalazioneId });
    if(!segnalazione){
        res.status(404).send( { error: 'Segnalazione non trovata.' });
        return
    }
    res.status(204).send();
});

module.exports = router;