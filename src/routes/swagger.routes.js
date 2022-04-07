const express = require('express')
const router = express.Router()
const controller = require('../controllers/swagger.controller')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger.json')

router.get('/json', (req, res) => {
    // #swagger.tags = ['Documentation']
    // #swagger.description = 'Get swagger.json'
    controller.show(req, res)
    // #swagger.responses[200]
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router