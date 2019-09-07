const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type:String,
        minlength: 7,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not contain the string "password"')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

//Instance method for sending necessary data back
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// userSchema.methods.publicProfile = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// Instance method for adding JWT in user details
userSchema.methods.createWebToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismycourse')
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Schema method for checking passwordd for login
userSchema.statics.findByCredentials = async ({email, password}) => {
    console.log('in findByCredentials')
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('id not present')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('login error')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User