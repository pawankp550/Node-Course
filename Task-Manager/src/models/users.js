const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const User = mongoose.model('User', {
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

module.exports = User