const mongoose = require("mongoose")
const answerSchema = require('./answer.schema')

module.exports = mongoose.Schema({
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