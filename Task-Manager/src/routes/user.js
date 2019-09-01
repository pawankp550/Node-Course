const express = require('express')
const user = require('../models/users')
const router = express.Router()

// create user endpoint
router.post('/users', async (req, res) => {
    const User = new user(req.body)
    try{
        const createdUser = await User.save()
        res.status(201).send(createdUser)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// login user endpoint
router.post('/users/login', async (req, res) => {
    try{
        const User = await user.findByCredentials(req.body)
        res.status(200).send(User)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// get users endpoint
router.get('/users', async (req, res) => {

    try{
        const users = await user.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send()
    }
})

// find user by id endpoint
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send('invalid update')
    }

    try{
        //const User = await user.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const User = await user.findById(_id)
        updates.forEach(update => User[update] = req.body[update])
        await User.save()

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
router.delete('/users/:id', async (req, res) => {
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

module.exports = router