const mongoose = require("mongoose")

exports.questionSchema = mongoose.Schema({
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