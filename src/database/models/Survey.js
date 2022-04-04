const mongoose = require("mongoose")
const surveySchema = require('../schemas/survey.schema')

module.exports = mongoose.model("Survey", surveySchema)