const express = require('express')
const router = express.Router()

const Response = require('../database/models/Response')

const getResponseById = require('../middleware/getters/responses/getResponseById')
const createResponseRequest = require('../middleware/requests/responses/createResponseRequest')

// Getting all
router.get('/', async (req, res) => {
    try {
		const responses = await Response.find()
		res.json(responses)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getResponseById, async (req, res) => {
    res.json(res.response)
})

// Creating one
router.post('/', createResponseRequest, async (req, res) => {
    const response = new Response({
		survey: req.body.survey,
		surveyTaker: req.body.surveyTaker,
		answers: req.body.answers
	})

	try {
		const newResponse = await response.save()
		res.status(201).json(newResponse)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Deleting one
router.delete('/:id', getResponseById, async (req, res) => {
	try {
		await res.response.remove()
		res.json({ message: 'Deleted response' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

module.exports = router