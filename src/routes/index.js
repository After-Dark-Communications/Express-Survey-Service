const express = require('express')
const router = express.Router()
const surveyRouter = require('./surveys')

router.use('/surveys', surveyRouter)

module.exports = router