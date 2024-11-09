const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Cartella per i calendari
const CalenDirectoryPath = path.join(__dirname, 'calendari');
if (!fs.existsSync(CalenDirectoryPath)) {
    fs.mkdirSync(CalenDirectoryPath);
}
// Cartella per le disposizioni
const DispDirectoryPath = path.join(__dirname, 'calendari');
if (!fs.existsSync(DispDirectoryPath)) {
    fs.mkdirSync(DispDirectoryPath);
}

// Array per i calendari
let calendari = [];
let disposizioni = [];

// Funzione per caricare i calendari dai file JSON all'avvio del server
function loadCalendari() {
    const files = fs.readdirSync(CalenDirectoryPath);
    calendari = files
        .filter(file => file.endsWith('.json'))
        .map(file => JSON.parse(fs.readFileSync(path.join(CalenDirectoryPath, file), 'utf8')));
}
function loadDisposizioni() {
    const files = fs.readdirSync(DispDirectoryPath);
    disposizioni = files
        .filter(file => file.endsWith('.json'))
        .map(file => JSON.parse(fs.readFileSync(path.join(DispDirectoryPath, file), 'utf8')));
}   
// Chiamata per aggiornare i calendari
loadCalendari();
loadDisposizioni();

app.use(express.json());
app.use(express.raw({ type: 'application/pdf', limit: '30mb' }));
app.get('/', (req, res) => {
    res.send("bella");
});
/*per ora non so come farla
app.get('/api/rifiuti/calendari', (req, res) =>{
    const calendars = getCalendars();
    res.json(calendars);
} );*/
app.get('/api/rifiuti/calendari/:zona', (req, res) => {
    const zona = req.params.zona;
    const calendario = calendari.find(c => c.zona === zona);
    if (!calendario) {
        return res.status(404).json({ error: 'Calendario non trovato per la zona specificata' });
    }
    
    /*
    //SCARICA IL FILE
    res.download(calendario.pdfFilePath, `calendario_${zona}.pdf`, (err) => {
        if (err) {
            res.status(500).json({ error: 'Errore durante il download del file' });
        }
    });
    */
    /* 
    APRE IL FILE NEL BROWSER
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=' + `calendario_${zona}.pdf`); 
    res.sendFile(calendario.pdfFilePath);
    */
});
app.post('/api/rifiuti/calendari/:zona', (req, res) => {
    const zona = req.params.zona;
    if (!zona) 
        return res.status(400).json({ error: 'Zona non specificata' });

    const fileBuffer = req.body;
    if (!fileBuffer || fileBuffer.length === 0) 
        return res.status(400).json({ error: 'Nessun file caricato' });

    // Percorso e nome dei file
    const pdfFilePath = path.join(CalenDirectoryPath, `calendario_${zona}.pdf`);
    const jsonFilePath = path.join(CalenDirectoryPath, `calendario_${zona}.json`);

    // Salva il file PDF
    fs.writeFile(pdfFilePath, fileBuffer, (err) => {
        if (err) {
            console.error("Errore durante il salvataggio del file:", err);
            return res.status(500).json({ error: 'Errore durante il salvataggio del file' });
        }

        // Aggiungi il nuovo calendario all'array `calendari`
        const nuovoCalendario = { zona, pdfFilePath };
        calendari.push(nuovoCalendario);

        // Salva i metadati come JSON
        fs.writeFileSync(jsonFilePath, JSON.stringify(nuovoCalendario));

        res.json({ message: `Calendario caricato con successo per la zona ${zona}` });
    });
});

app.get('/api/rifiuti/disposizioni', (req, res) => {
    
});


app.listen(port, () => console.log("server on port " + port));