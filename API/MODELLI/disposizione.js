const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Disposizione', new Schema({
    title: String,
    pdf: {
        data: Buffer,
        contentType: String
    }
}));