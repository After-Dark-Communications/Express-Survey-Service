const mongoose = require("mongoose")
const surveySchema = require('../schemas/surveySchema')

module.exports = mongoose.model("Survey", surveySchema)