const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Utente', new Schema({
    utenteId: String,
    nome: String,
    cognome: String,
    email: String,
    codiceFiscale: String
}));