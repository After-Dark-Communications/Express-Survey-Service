const Survey = require('../../database/models/Survey')

module.exports = async function getSurveyById(req, res, next) {
	try {
		const survey = await Survey.findById(req.params.id)
		if (survey == null) {
            return res.status(404).json({ message: 'Cannot find survey'})
		}
        req.survey = survey
	} catch (err) {
		return res.status(500).json({ message: err.message})
	}
	
	next()
}