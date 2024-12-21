const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    permissions: [String]
}));