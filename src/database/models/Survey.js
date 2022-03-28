const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isRequired: {
        type: Boolean,
        required: true
    }
})

const surveySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	questions: {
		type: [questionSchema]
	},
    created: {
        type: Date,
        required: true,
        default: Date()
    }
})

module.exports = mongoose.model("Survey", surveySchema)