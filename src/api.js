const express = require('express')
const router = require('./routes')
const db = require('./database')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/api', router)

db.connect(process.env.DATABASE_URL)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})