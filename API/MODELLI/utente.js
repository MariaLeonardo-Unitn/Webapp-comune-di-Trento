const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Utente', new Schema({
    utenteId: String,
    nome: String,
    cognome: String,
    codiceFiscale: String,
    email: String,
    password: String,
    role: String,
    permissions: [String]
}));