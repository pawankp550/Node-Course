const express = require('express')
const user = require('../models/users')
const router = express.Router()
const auth = require('../middleware/auth')

// create user endpoint
router.post('/users', async (req, res) => {
    const User = new user(req.body)

    try{
        const createdUser = await User.save()
        const token = await createdUser.createWebToken()
        //const userToReturn = createdUser.publicProfile()
        res.status(201).send({ createdUser, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// login user endpoint
router.post('/users/login', async (req, res) => {
    try{
        const User = await user.findByCredentials(req.body)
        const token = await User.createWebToken()
        res.status(200).send({ User, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// logout user endpoint
router.post('/users/logout', auth, async (req, res) => {
    try{
        let token = req.token
        console.log('logout token '+token)
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== token
        })

        await req.user.save()
        res.status(200).send()
    }
    catch (e) {
           res.status(500).send()
    }
})

// logout all endpoint
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        console.log(req.user.tokens)
        req.user.tokens = []
        console.log(req.user.tokens)
        await req.user.save()
        res.send()
    }
    catch (e) {
           res.status(500).send()
    }
})

// get user endpoint
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//update user endpoint
router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send('invalid update')
    }

    try{
        //const User = await user.findById(_id, req.body, { new: true, runValidators: true })
        const User = req.user
        updates.forEach(update => User[update] = req.body[update])
        await User.save()
        res.send(User)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// delete user endpoint
router.delete('/users/me', auth, async (req, res) => {
    const _id = req.user._id
    console.log(_id)
    try{
        // const User = await user.findByIdAndDelete(_id)
        // console.log(User)
        // if(!User){
        //     return res.status(404).send()
        // }
        // OR

        // use mongoose remove method
        req.user.remove()
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router

// // find user by id endpoint
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try{
//         let User = await user.findById(_id)
//         if(!User){
//             return res.status(404).send()
//         }

//         res.send(User)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })