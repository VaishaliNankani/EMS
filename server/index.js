const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const employeeRouter = require('./routes/employee-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', employeeRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
