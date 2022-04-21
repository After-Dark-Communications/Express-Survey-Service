const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.DATABASE_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => { console.log('connected to database') },
        err => { console.log(err) }
    )
}

module.exports = { connect }