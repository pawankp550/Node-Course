const express = require('express')
// Mongoose connection
require('./db/mongoose')
const user = require('./models/users')
const task = require('./models/tasks')

const app = express()
const port = process.env.port || 3000

// convert json to object
app.use(express.json())

// create user endpoint
app.post('/users', (req, res) => {
    new user(req.body)
    .save()
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

// create task endpoint
app.post('/tasks', (req, res) => {
    new task(req.body)
    .save()
    .then(task => {
        res.send(task)
    })
    .catch(error => {
        res.status(400).send(error)
    })
}) 

app.listen(port, () => {
    console.log('server started')
})