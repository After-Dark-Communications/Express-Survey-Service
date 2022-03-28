const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')
const surveyRouter = require('./surveys')
const responseRouter = require('./responses')

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.use('/surveys', surveyRouter)
router.use('/responses', responseRouter)

module.exports = router