const express = require('express')
const router = express.Router()

const controller = require('../controllers/response.controller')
const getResponseById = require('../middleware/response/getResponseById')
const getSurveyById = require('../middleware/survey/getSurveyById')
const createResponseRequest = require('../middleware/response/createResponseRequest')

// Get all
router.get('/', async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get all responses'
	controller.index(req, res)
	// #swagger.responses[200] = {schema:[{$ref:"#/definitions/Response"}]}
})

// Get one
router.get('/:response', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get response by ID'
    // #swagger.parameters['response'] = {description: "ID of the response"}
    controller.show(req, res)
	// #swagger.responses[200] = {schema:{$ref:"#/definitions/Response"}}
})

// Create one
router.post('/:survey', getSurveyById, createResponseRequest, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Create response'
    // #swagger.parameters['survey'] = {description: "ID of the survey"}
    // #swagger.parameters['response'] = {in:'body',schema:{$ref:"#/definitions/AddResponse"}}
	controller.store(req, res)
	// #swagger.responses[201] = {schema:{$ref:"#/definitions/Response"}}
})

// Delete one
router.delete('/:response', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Delete response'
    // #swagger.parameters['response'] = {description: "ID of the response"}
	controller.destroy(req, res)
	// #swagger.responses[204]
})

module.exports = router