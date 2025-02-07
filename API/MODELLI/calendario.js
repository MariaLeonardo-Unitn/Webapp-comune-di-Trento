
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Calendario', new Schema({
    title: String,
    zone: String,
    pdf: {
        data: Buffer,
        contentType: String
    }
}));
