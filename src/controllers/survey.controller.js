const Survey = require('../database/models/Survey')

exports.index = async function(req, res) {
    try {
		const surveys = await Survey.find()
		res.json(surveys)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
}

exports.show = async function(req, res) {
    res.json(req.survey)
}

exports.store = async function(req, res) {
	try {
		const newSurvey = await req.survey.save()
		res.status(201).json(newSurvey)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.update = async function(req, res) {
	try {
		const updatedSurvey = await req.survey.save()
		res.send(updatedSurvey)
	} catch(err) {
		res.status(500).json({ message: err.message })
	}
}

exports.destroy = async function(req, res) {
	try {
		await req.survey.remove()
		res.status(204).json({ message: 'Deleted survey' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}