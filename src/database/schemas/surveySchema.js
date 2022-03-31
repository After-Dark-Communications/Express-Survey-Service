const mongoose = require("mongoose")
const questionSchema = require('./questionSchema')
const responseSchema = require('./responseSchema')

exports.surveySchema = mongoose.Schema({
    name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
    visibility: {
        type: String,
        required: true,
        default: 'private'
    },
	questions: {
		type: [questionSchema],
        required: true
	},
    responses: {
        type: [responseSchema],
        required: false
    },
    created: {
        type: Date,
        required: true,
        default: Date()
    },
    updated: {
        type: Date,
        required: true,
        default: Date()
    }
})