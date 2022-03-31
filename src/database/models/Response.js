const mongoose = require("mongoose")
const responseSchema = require('../schemas/responseSchema')

module.exports = mongoose.model("Response", responseSchema)