const express = require('express')
const router = express.Router()
const surveyRouter = require('./surveys')
const responseRouter = require('./responses')

router.use('/surveys', surveyRouter)
router.use('/responses', responseRouter)

module.exports = router