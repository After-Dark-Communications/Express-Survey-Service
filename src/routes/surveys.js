const express = require('express')
const router = express.Router()

const Survey = require('../database/models/Survey')
const Response = require('../database/models/Response')

const getSurveyById = require('../middleware/getters/surveys/getSurveyById')
const createSurveyRequest = require('../middleware/requests/surveys/createSurveyRequest')
const updateSurveyRequest = require('../middleware/requests/surveys/updateSurveyRequest')

// Getting all
router.get('/', async (req, res) => {
    try {
		const surveys = await Survey.find()
		res.json(surveys)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getSurveyById, async (req, res) => {
    res.json(res.survey)
})

// Create one
router.post('/', createSurveyRequest, async (req, res) => {
    const survey = new Survey({
		name: req.body.name,
		type: req.body.type,
		questions: req.body.questions
	})

	try {
		const newSurvey = await survey.save()
		res.status(201).json(newSurvey)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Updating one
router.patch('/:id', updateSurveyRequest, getSurveyById, async (req, res) => {
	if (req.body.name) {
		res.survey.name = req.body.name
	}
	if (req.body.type) {
		res.survey.type = req.body.type
	}
	if (req.body.questions) {
		res.survey.questions = req.body.questions
	}

	try {
		const updatedSurvey = await res.survey.save()
		res.send(updatedSurvey)
	} catch(err) {
		res.status(500).json({ message: err.message })
	}
})

// Deleting one
router.delete('/:id', getSurveyById, async (req, res) => {
	try {
		await res.survey.remove()
		res.json({ message: 'Deleted survey' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting responses
router.get('/:id/responses', getSurveyById, async (req, res) => {
    try {
		const responses = await Response.find({survey: res.survey.id})
		res.json(responses)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

module.exports = router