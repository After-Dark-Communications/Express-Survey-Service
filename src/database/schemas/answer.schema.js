const mongoose = require("mongoose")
const questionSchema = require("./question.schema")

module.exports = mongoose.Schema({
    question: {
        type: questionSchema,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})