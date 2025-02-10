const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('PuntoRitiro', new Schema({
    puntoRitiroId: String,
    nome: String,
    indirizzo: String,
    orari: [{
        giorno: String,
        apertura: String,
        chiusura: String
    }],
    tipiSacchetti: [String]
}));