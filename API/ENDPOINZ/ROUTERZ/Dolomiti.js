const express = require('express');
const router = express.Router();
const Segnalazione = require('../../MODELLI/segnalazione');
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

module.exports = router;