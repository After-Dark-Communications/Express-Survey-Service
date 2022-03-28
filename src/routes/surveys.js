const express = require('express')
const router = express.Router()

const Survey = require('../database/models/Survey')
const Response = require('../database/models/Response')

const getSurveyById = require('../middleware/getters/surveys/getSurveyById')
const createSurveyRequest = require('../middleware/requests/surveys/createSurveyRequest')
const updateSurveyRequest = require('../middleware/requests/surveys/updateSurveyRequest')

// Getting all
router.get('/', async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Get all surveys in database.'
    try {
		const surveys = await Survey.find()
		res.json(surveys)
        // #swagger.responses[200] = {schema:[{$ref:"#/definitions/Survey"}]}
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Get survey by ID.'
    // #swagger.parameters['id'] = {description: "ID of the survey"}
    res.json(res.survey)
    // #swagger.responses[200] = {schema:{$ref:"#/definitions/Survey"}}
})

// Create one
router.post('/', createSurveyRequest, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Create survey.'
    // #swagger.parameters['survey'] = {in:'body',schema:{$ref:"#/definitions/AddSurvey"}}
    const survey = new Survey({
		name: req.body.name,
		type: req.body.type,
		questions: req.body.questions
	})

	try {
		const newSurvey = await survey.save()
		res.status(201).json(newSurvey)
        // #swagger.responses[201] = {schema:{$ref:"#/definitions/Survey"}}
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Updating one
router.patch('/:id', updateSurveyRequest, getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Update survey by ID.'
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
        // #swagger.responses[200] = {schema:{$ref:"#/definitions/Survey"}}
	} catch(err) {
		res.status(500).json({ message: err.message })
	}
})

// Deleting one
router.delete('/:id', getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Delete survey by ID.'
	try {
		await res.survey.remove()
		res.json({ message: 'Deleted survey' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting responses
router.get('/:id/responses', getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Get all responses of survey.'
    try {
		const responses = await Response.find({survey: res.survey.id})
		res.json(responses)
        // #swagger.responses[200] = {schema:[{$ref:"#/definitions/Response"}]}
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
})

module.exports = router