const mongoose = require("mongoose")
const answerSchema = require('./answerSchema')

exports.responseSchema = mongoose.Schema({
    surveyTaker: {
        type: String,
        required: true
    },
    answers: {
        type: [answerSchema],
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date()
    }
})