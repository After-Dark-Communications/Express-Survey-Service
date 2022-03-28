module.exports = function createSurveyRequest(req, res, next) {
    if (req.body.name) {
        if (req.body.name.length < 4) {
            return res.status(400).json({message: 'Survey name must be longer than 4 characters'})
        }
    }

    next()
}