module.exports = function createResponseRequest(req, res, next) {
    if (!req.body.survey) {
        return res.status(400).json({message: 'Survey id is required'})
    }
    
    if (!req.body.surveyTaker) {
        return res.status(400).json({message: 'Survey taker is required'})
    }
    if (req.body.surveyTaker.length < 4) {
        return res.status(400).json({message: 'Survey taker must be longer than 4 characters'})
    }

    // TODO: Check if all required questions are answered

    next()
}