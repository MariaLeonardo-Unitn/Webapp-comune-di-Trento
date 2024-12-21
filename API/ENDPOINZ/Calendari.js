const express = require('express');
const router = express.Router();
const Calendar = require('../MODELLI/calendario');
const multer = require('multer');
const Upload = multer({ storage: multer.memoryStorage });

router.use(express.json());

//utilizzabile dall'utenz
router.get('/:zona', async (req, res) => {
    try{   
        const zona = req.params.zona;
        const calendario = await Calendar.findOne({zona});
        if (!calendario) {
            return res.status(404).json({ error: 'Calendario non trovato per la zona specificata' });
        }
            
        res.set('Content-type', calendario.pdf.contentType); 
        res.sendFile(calendario.pdf.data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


//utilizzabile dall'interfaccia di DOLOMITES
router.post('/:zona', Upload.single('file'), async (req, res) => {
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
        await calendario.save();
        res.status(201).send('File uploaded successfully');
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;