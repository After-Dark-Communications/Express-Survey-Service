const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true // TODO: Figure out how to check if answered question was required
    }
})

const responseSchema = mongoose.Schema({
    survey: {
        type: String,
        required: true
    },
    surveyTaker: {
        type: String,
        required: true
    },
	answers: {
		type: [answerSchema]
	},
    created: {
        type: Date,
        required: true,
        default: Date()
    }
})

module.exports = mongoose.model("Response", responseSchema)