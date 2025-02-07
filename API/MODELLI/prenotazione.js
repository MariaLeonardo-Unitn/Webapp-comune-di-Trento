const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Prenotazione', new Schema({
    prenotazioneId: String,
    utente: { type: Schema.Types.ObjectId, ref: 'Utente' },
    tipoSacchetto: String,
    quantita: Number,
    dataPrenotazione: { type: Date, default: Date.now },
    puntoRitiro: { type: Schema.Types.ObjectId, ref: 'PuntoRitiro'},
    stato: { type: String, enum: ["in attesa", "confermato", "ritirato", "annullato"], default: "in attesa" }
}));