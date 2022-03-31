const express = require('express')
const router = express.Router()

const responseController = require('../controllers/responseController')
const getResponseById = require('../middleware/getters/responses/getResponseById')
const getSurveyById = require('../middleware/getters/surveys/getSurveyById')
const createResponseRequest = require('../middleware/requests/responses/createResponseRequest')

// Get all
router.get('/', async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get all responses in database.'
	responseController.index(req, res)
	// #swagger.responses[200] = {schema:[{$ref:"#/definitions/Response"}]}
})

// Get one
router.get('/:id', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get response by ID.'
    // #swagger.parameters['id'] = {description: "ID of the response"}
    responseController.show(req, res)
	// #swagger.responses[200] = {schema:{$ref:"#/definitions/Response"}}
})

// Create one
router.post('/:id', getSurveyById, createResponseRequest, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Create response.'
    // #swagger.parameters['id'] = {description: "ID of the survey"}
    // #swagger.parameters['response'] = {in:'body',schema:{$ref:"#/definitions/AddResponse"}}
	responseController.store(req, res)
	// #swagger.responses[201] = {schema:{$ref:"#/definitions/Response"}}
})

// Delete one
router.delete('/:id', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Delete response.'
    // #swagger.parameters['id'] = {description: "ID of the response"}
	responseController.destroy(req, res)
	// #swagger.responses[204]
})

module.exports = router