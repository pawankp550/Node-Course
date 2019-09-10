const express = require('express')
const task = require('../models/tasks')
const router = express.Router()
const auth = require('../middleware/auth')

// create task endpoint
router.post('/tasks', auth, async (req, res) => {
    const Task = new task({
        ...req.body,
        owner: req.user._id
    })

    console.log(Task)

    try{
        const createdTask = await Task.save()
        res.status(201).send(createdTask)
    }
    catch(e){
        res.status(400).send(error)
    }
})

// get tasks endpoint
router.get('/tasks', auth, async (req, res) => {

    try{
        //const tasks = await task.find({})
        const tasks = await task.find({ owner: req.user._id })
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

// get tasks by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        //const Task = await task.findById(_id)

        console.log(req.user._id)
        const Task = await task.findOne({ _id , owner: req.user._id })
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
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('invalid updates')
    }

    try{
        //const Task = await task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const Task = await task.findOne({ _id, owner: req.user._id })
        if(!Task){
         return res.status(400).send()
        }

        updates.forEach(update => Task[update] = req.body[update])
        await Task.save()
        res.status(202).send(Task)
    }
    catch (e) {
        res.status(400).send()
    }
})

// delete task endpoint
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const Task = await task.findOneAndDelete({ _id, owner: req.user._id })
        if(!Task){
            return res.status(404).send()
        }

        res.send(Task)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router


// "name": "pawan",
// 	"email": "q@g.com",
// 	"password": "qwedsa123"

// "name": "pawan2",
// 	"email": "w@g.com",
// 	"password": "qwedsa123"

// "name": "pa",
// 	"email": "pa@a.com",
// 	"password": "qwedsa123"
//5d75245eb592c659abe80fdb
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc1MjQ1ZWI1OTJjNjU5YWJlODBmZGIiLCJpYXQiOjE1Njc5NTk1OTB9.wvMdshx3hrXq2ZYR9u9LHinx7R976J5gJWKSkvgyVHk