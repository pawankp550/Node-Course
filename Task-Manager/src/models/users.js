const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

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
    }
})

userSchema.statics.findByCredentials = async ({email, password}) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('id not present')
    }
    const isMatch = await bcrypt.compare(user.password, password)

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