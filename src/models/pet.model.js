const mongoose = require("mongoose");


const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    padre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: false
    },
    foto: {
        type: String,
        required: false
    },
    telefono: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pet', petSchema);