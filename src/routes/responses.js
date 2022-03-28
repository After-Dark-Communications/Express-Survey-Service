const express = require('express')
const router = express.Router()

const Response = require('../database/models/Response')

const getResponseById = require('../middleware/getters/responses/getResponseById')
const createResponseRequest = require('../middleware/requests/responses/createResponseRequest')

// Getting all
router.get('/', async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get all responses in database.'
    try {
		const responses = await Response.find()
		res.json(responses)
        // #swagger.responses[200] = {schema:[{$ref:"#/definitions/Response"}]}
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Get response by ID.'
    // #swagger.parameters['id'] = {description: "ID of the response"}
    res.json(res.response)
	// #swagger.responses[200] = {schema:{$ref:"#/definitions/Response"}}
})

// Creating one
router.post('/', createResponseRequest, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Create response.'
    // #swagger.parameters['response'] = {in:'body',schema:{$ref:"#/definitions/AddResponse"}}
    const response = new Response({
		survey: req.body.survey,
		surveyTaker: req.body.surveyTaker,
		answers: req.body.answers
	})

	try {
		const newResponse = await response.save()
		res.status(201).json(newResponse)
		// #swagger.responses[201] = {schema:{$ref:"#/definitions/Response"}}
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Deleting one
router.delete('/:id', getResponseById, async (req, res) => {
    // #swagger.tags = ['Response']
    // #swagger.description = 'Delete response.'
    // #swagger.parameters['id'] = {description: "ID of the response"}
	try {
		await res.response.remove()
		res.json({ message: 'Deleted response' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

module.exports = router