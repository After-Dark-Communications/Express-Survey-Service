const Response = require('../../database/models/Response')

module.exports = function createResponseRequest(req, res, next) {
    if (!req.body.surveyTaker) {
        return res.status(400).json({message: 'Survey taker is required'})
    }
    if (req.body.surveyTaker.length < 4) {
        return res.status(400).json({message: 'Survey taker must be longer than 4 characters'})
    }
    if (req.body.surveyTaker.length > 64) {
        return res.status(400).json({message: 'Survey taker must be shorter than 64 characters'})
    }

    req.survey.questions.forEach(question => {
        if (question.required) {
            const answer = req.body.answers.find(answer => answer.question._id == question._id)
            if (!answer) {
                return res.status(400).json({message: 'Survey response must provide an answer to all required questions'})
            }
        }
    })

    req.response = new Response({
		surveyTaker: req.body.surveyTaker,
		answers: req.body.answers
	})

    next()
}