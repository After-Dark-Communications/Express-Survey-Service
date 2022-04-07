const express = require('express')
const router = express.Router()
const surveyRouter = require('./survey.routes')
const responseRouter = require('./response.routes')
const swaggerRouter = require('./swagger.routes')

router.use('/surveys', surveyRouter)
router.use('/responses', responseRouter)
router.use('/docs', swaggerRouter)

module.exports = router