const Survey = require('../database/models/Survey')
const Response = require('../database/models/Response')

exports.index = async function(req, res) {
    console.log('hoi');
    try {
		const surveys = await Survey.find()
		res.json(surveys)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
}

exports.show = async function(req, res) {
    res.json(res.survey)
}

exports.store = async function(req, res) {
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
}

exports.update = async function(req, res) {
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
}

exports.destroy = async function(req, res) {
	try {
		await res.survey.remove()
		res.json({ message: 'Deleted survey' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.showResponses = async function(req, res) {
    try {
		const responses = await Response.find({survey: res.survey.id})
		res.json(responses)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
}