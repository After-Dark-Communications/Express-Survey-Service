const app = require('./app')
const db = require('./database')

db.connect(process.env.DATABASE_URL)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})