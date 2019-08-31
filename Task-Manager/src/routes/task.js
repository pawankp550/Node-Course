const express = require('express')
const task = require('../models/tasks')
const router = express.Router()

// create task endpoint
router.post('/tasks', async (req, res) => {
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
router.get('/tasks', async (req, res) => {

    try{
        const tasks = await task.find({})
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

// get tasks by id
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router