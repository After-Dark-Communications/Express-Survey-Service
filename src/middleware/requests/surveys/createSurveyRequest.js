const Survey = require('../../../database/models/Survey')

module.exports = function createSurveyRequest(req, res, next) {
    // Name rules
    if (!req.body.name) {
        return res.status(400).json({message: 'Survey name is required'})
    }
    if (req.body.name.length < 4) {
        return res.status(400).json({message: 'Survey name must be longer than 4 characters'})
    }
    if (req.body.name.length > 64) {
        return res.status(400).json({message: 'Survey name must be shorter than 64 characters'})
    }

    // Description rules
    if (req.body.description) {
        if (req.body.description.length < 4) {
            return res.status(400).json({message: 'Survey description must be longer than 4 characters'})
        }
        if (req.body.description.length > 64) {
            return res.status(400).json({message: 'Survey description must be shorter than 64 characters'})
        }
    }

    // Visibility rules
    if (req.body.visibility) {
        switch(req.body.visibility) {
            case 'public': break
            case 'private': break
            default: {
                return res.status(400).json({message: 'Survey visibility must be "public" or "private"'})
            }
        }
    }

    // Questions rules
    if (req.body.questions.length < 1) {
        return res.status(400).json({message: 'Survey must have at least one question'})
    }

    req.survey = new Survey({
		name: req.body.name,
		description: req.body.description,
        visibility: req.body.visibility,
		questions: req.body.questions
	})

    next()
}