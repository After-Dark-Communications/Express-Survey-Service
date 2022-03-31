const express = require('express')
const router = express.Router()

const surveyController = require('../controllers/surveyController')
const getSurveyById = require('../middleware/getters/surveys/getSurveyById')
const createSurveyRequest = require('../middleware/requests/surveys/createSurveyRequest')
const updateSurveyRequest = require('../middleware/requests/surveys/updateSurveyRequest')

// Get all
router.get('/', (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Get all surveys in database.'
	surveyController.index(req, res)
	// #swagger.responses[200] = {schema:[{$ref:"#/definitions/Survey"}]}
})

// Get one
router.get('/:id', getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Get survey by ID.'
    // #swagger.parameters['id'] = {description: "ID of the survey"}
	surveyController.show(req, res)
    // #swagger.responses[200] = {schema:{$ref:"#/definitions/Survey"}}
})

// Create one
router.post('/', createSurveyRequest, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Create survey.'
    // #swagger.parameters['survey'] = {in:'body',schema:{$ref:"#/definitions/AddSurvey"}}
	surveyController.store(req, res)
	// #swagger.responses[201] = {schema:{$ref:"#/definitions/Survey"}}
})

// Updating one
router.patch('/:id', getSurveyById, updateSurveyRequest, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Update survey by ID.'
    // #swagger.parameters['id'] = {description: "ID of the survey"}
    // #swagger.parameters['survey'] = {in:'body',schema:{$ref:"#/definitions/AddSurvey"}}
	surveyController.update(req, res)
	// #swagger.responses[200] = {schema:{$ref:"#/definitions/Survey"}}
})

// Deleting one
router.delete('/:id', getSurveyById, async (req, res) => {
    // #swagger.tags = ['Survey']
    // #swagger.description = 'Delete survey by ID.'
    // #swagger.parameters['id'] = {description: "ID of the survey"}
	surveyController.destroy(req, res)
	// #swagger.responses[204]
})

module.exports = router