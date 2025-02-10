const express = require('express');
const router = express.Router();
const Calendar = require('../../MODELLI/calendario');
const multer = require('multer');
const storage = multer.memoryStorage();
const Upload = multer({ storage });
const { authenticateToken, authenticateDolRole } = require('./Authentication');
const calendario = require('../../MODELLI/calendario');

router.use(express.json());

//utilizzabile dall'utenz
router.get('/:zona', authenticateToken, async (req, res) => {
    try{   
        const zone = req.params.zona;
        const calendario = await Calendar.findOne({zone});
        if (!calendario) 
            return res.status(404).json({ error: 'Calendario non trovato o non ancora presente per la zona specificata' });

        res.set('Content-type', calendario.pdf.contentType); 
        res.status(200).send(calendario.pdf.data.buffer);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


//utilizzabile dall'interfaccia di DOLOMITES
router.post('/:zona', authenticateDolRole, Upload.single('file'), async (req, res) => {
    try{
        const zona = req.params.zona;
        if (!zona) 
            return res.status(400).json({ error: 'Zona non specificata' });

        const calendario = new Calendar({
            title: req.body.title,
            zone: zona,
            pdf: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        console.log(calendario);

        await calendario.save();
        res.status(201).send('File uploaded successfully');
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//utilizzabile dai DOLOMITES
router.delete('/:zona', authenticateDolRole, async (req, res) => {
    try {
        const zona = req.params.zona;
        const calendario = await Calendar.findOneAndDelete({ zone: zona });
        if (!calendario) 
            return res.status(404).json({ error: 'Calendario non trovato per la zona specificata' });
        
        res.status(200).json({ message: 'Calendario eliminato correttamente' });
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

//usable dalle dolomiti
router.patch('/:zona', authenticateDolRole, Upload.single('file'), async (req, res) => {
    try {
        const zona = req.params.zona;
        const calendario = await Calendar.findOne({ zone: zona });

        if (!calendario) 
            return res.status(404).json({ error: 'Calendario non trovato per la zona specificata' });
        

        calendario.pdf.data = req.file.buffer;
        calendario.pdf.contentType = req.file.mimetype;
        await calendario.save();

        res.status(200).send('Calendario aggiornato correttamente');
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;