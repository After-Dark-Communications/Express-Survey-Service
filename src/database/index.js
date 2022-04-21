const mongoose = require('mongoose')

function connect() {
    try {
        mongoose.connect(process.env.DATABASE_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to database')
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connect }