const mongoose = require("mongoose")
const questionSchema = require("./questionSchema")

exports.answerSchema = mongoose.Schema({
    question: {
        type: questionSchema,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})