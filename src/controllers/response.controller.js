const Response = require('../database/models/Response')

exports.index = async function(req, res) {
    try {
		const responses = await Response.find()
		res.json(responses)
    } catch(err) {
		res.status(500).json({ message: err.message })
    }
}

exports.show = async function(req, res) {
    res.json(req.response)
}

exports.store = async function(req, res) {
	try {
		const newResponse = await req.response.save()
        req.survey.responses.push(newResponse._id)
        await req.survey.save()
		res.status(201).json(newResponse)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

exports.destroy = async function(req, res) {
	try {
		await req.response.remove()
		res.status(204).json({ message: 'Deleted response' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}