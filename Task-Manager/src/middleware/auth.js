const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    console.log('in middle')
    try{
        const token = req.header('Authorization')
        console.log('Newwwwwwwwwww'+token)
        const decodedToken = jwt.verify(token, 'thisismycourse')
        const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token })

        if(!user){
            throw new Error
        }
        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.status(501).send('please authenticate')
    }
}

module.exports = auth