module.exports = function createSurveyRequest(req, res, next) {
    // Name rules
    if (req.body.name) {
        if (req.body.name.length < 4) {
            return res.status(400).json({message: 'Survey name must be longer than 4 characters'})
        }
        if (req.body.name.length > 64) {
            return res.status(400).json({message: 'Survey name must be shorter than 64 characters'})
        }
        req.survey.name = req.body.name
    }

    // Description rules
    if (req.body.description) {
        if (req.body.description.length < 4) {
            return res.status(400).json({message: 'Survey description must be longer than 4 characters'})
        }
        if (req.body.description.length > 64) {
            return res.status(400).json({message: 'Survey description must be shorter than 64 characters'})
        }
        req.survey.description = req.body.description
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
        req.survey.visibility = req.body.visibility
    }

    // Questions rules
    if (req.body.questions) {
        if (req.body.questions.length < 1) {
            return res.status(400).json({message: 'Survey must have at least one question'})
        }
        req.survey.questions = req.body.questions
    }

    req.survey.updated = Date()

    next()
}