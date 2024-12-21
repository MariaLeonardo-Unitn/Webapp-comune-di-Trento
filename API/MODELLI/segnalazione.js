const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Segnalazione', new Schema({
    segnalazioneId: String,
    utenteId: String,
    luogo: String,
    data: {type: Date, default: Date.now},
    descrizione: String,
    stato: String,
    foto: String,
    posizione: {
        latitudine: Number,
        longitudine: Number
    }
}));