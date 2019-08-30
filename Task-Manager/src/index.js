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
app.post('/users', async (req, res) => {
    const User = new user(req.body)
    try{
        const createdUser = await User.save()
        res.status(201).send(createdUser)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// get users endpoint
app.get('/users', async (req, res) => {

    try{
        const users = await user.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
})

// find user by id endpoint
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        let User = await user.findById(_id)
        if(!User){
            return res.status(404).send()
        }

        res.send(User)
    }
    catch(e){
        res.status(500).send()
    }
})

//update user endpoint
app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send('invalid update')
    }

    try{
        const User = await user.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if(!User){
            return res.status(404).send('no user found with this id')
        }
        res.send(User)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// delete user endpoint
app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    console.log(_id)
    try{
        const User = await user.findByIdAndDelete(_id)
        console.log(User)
        if(!User){
            return res.status(404).send()
        }

        res.send(User)
    }
    catch (e) {
        res.status(500).send()
    }
})

// create task endpoint
app.post('/tasks', async (req, res) => {
    const Task = new task(req.body)

    try{
        const createdTask = await Task.save()
        res.status(201).send(createdTask)
    }
    catch(e){
        res.status(400).send(error)
    }
})

// get tasks endpoint
app.get('/tasks', async (req, res) => {

    try{
        const tasks = await task.find({})
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

// get tasks by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const Task = await task.findById(_id)
        console.log(Task)
        if(!Task){
            return res.status(404).send()
        }

        res.send(Task)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//update task by id
app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('invalid updates')
    }

    try{
        const Task = await task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if(!Task){
         return res.status(400).send()
        }

        res.status(202).send(Task)
    }
    catch (e) {
        res.status(400).send()
    }
})

// delete task endpoint
app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const Task = await task.findByIdAndDelete(_id)
        if(!Task){
            return res.status(404).send()
        }

        res.send(Task)
    }
    catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('server started')
})