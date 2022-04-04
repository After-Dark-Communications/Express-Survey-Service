const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')
const surveyRouter = require('./survey.routes')
const responseRouter = require('./response.routes')

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.use('/surveys', surveyRouter)
router.use('/responses', responseRouter)

module.exports = router