const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    codiceFiscale: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    prenotazioni: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prenotazione' }]
});

const prenotazioneSchema = new mongoose.Schema({
    utente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tipoSacchetto: { type: String, required: true },
    quantita: { type: Number, required: true },
    dataPrenotazione: { type: Date, default: Date.now },
    puntoRitiro: { type: String, required: true },
    stato: { type: String, enum: ['pendente', 'confermata', 'ritirata', 'annullata'], default: 'pendente' }
});

const puntoRitiroSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    indirizzo: { type: String, required: true },
    orari: [{
        giorno: { type: String },
        apertura: { type: String },
        chiusura: { type: String }
    }],
    tipiSacchetti: [String]
});

const User = mongoose.model('User', userSchema);
const Prenotazione = mongoose.model('Prenotazione', prenotazioneSchema);
const PuntoRitiro = mongoose.model('PuntoRitiro', puntoRitiroSchema);

mongoose.connect('mongodb://localhost/your_database_name')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
