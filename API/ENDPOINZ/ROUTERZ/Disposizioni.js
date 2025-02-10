
const express = require('express');
const router = express.Router();
const Disp = require('../../MODELLI/disposizione');
const multer = require('multer');
const storage = multer.memoryStorage();
const Upload = multer({ storage });
const { authenticateToken, authenticateDolRole } = require('./Authentication');


router.use(express.json());

//unica per l'utenz
router.get('/', authenticateToken, async (req, res) => {
    try{   
        const disposizione = await Disp.findOne().sort({_id: -1}); //trova l'ultima inserita
        if (!disposizione) {
            return res.status(404).json({ error: 'Disposizione non trovata per id specificato' });
        }
            
        res.set('Content-type', disposizione.pdf.contentType); 
        res.status(200).send(disposizione.pdf.data.buffer);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


//utilizzabile dall'interfaccia di DOLOMITES
router.post('/', authenticateDolRole, Upload.single('file'), async (req, res) => {
    try{
        const disposizione = new Disp({
            title: req.body.title,
            pdf: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        await disposizione.save();
        res.status(201).send('File uploaded successfully');
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//sempre e solo dolomiti
router.patch('/', authenticateDolRole, Upload.single('file'), async (req, res) => {
    try {
        const disposizione = await Disp.findOne().sort({ _id: -1 }); // Trova la più recente
        if (!disposizione) 
            return res.status(404).json({ error: 'Disposizione non trovata' });


        disposizione.title = req.body.title;
        disposizione.pdf.data = req.file.buffer;
        disposizione.pdf.contentType = req.file.mimetype;
        await disposizione.save();

        res.status(200).send('Disposizione aggiornata correttamente');
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

// dolomitus
router.delete('/', authenticateDolRole, async (req, res) => {
    try {
        const disposizione = await Disp.findOne().sort({ _id: 1 }); // Trova la meno recente
        if (!disposizione) 
            return res.status(404).json({ error: 'Disposizione non trovata' });

        await Disp.findByIdAndDelete(disposizione._id);
        res.status(200).json({ message: 'Disposizione eliminata correttamente' });
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
