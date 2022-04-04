const mongoose = require("mongoose")
const responseSchema = require('../schemas/response.schema')

module.exports = mongoose.model("Response", responseSchema)