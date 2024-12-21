const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Notifica', new Schema({
    utenteId: String,
    message: String,
    segnalazioneId: {type: String, default: null },
    data: {type: Date, default: Date.now }
}));