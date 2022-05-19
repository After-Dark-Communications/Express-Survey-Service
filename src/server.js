const app = require('./app')
const db = require('./database')
const port = process.env.PORT || 3000

db.connect()

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})