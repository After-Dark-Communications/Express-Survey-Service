const path = require('path')

exports.show = function(req, res) {
    res.sendFile(path.resolve('src/docs/swagger.json'))
}