const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task