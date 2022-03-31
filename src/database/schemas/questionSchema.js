const mongoose = require("mongoose")

module.exports = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: [],
        required: false
    },
    required: {
        type: Boolean,
        required: true,
        default: true
    }
})