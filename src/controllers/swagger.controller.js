const swagger = require('../docs/swagger.json')

exports.show = function(req, res) {
    res.json(swagger)
}