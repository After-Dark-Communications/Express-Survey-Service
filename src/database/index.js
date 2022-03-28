const mongoose = require('mongoose')

function connect(databaseUrl) {
    mongoose.connect(databaseUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}

module.exports = { connect }