const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://User:Mongo@12345@cluster0-d2yun.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'Task-Manager-Api',
    useFindAndModify: false
})

// const Task = mongoose.model('task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const t1 = new Task({
//     description: 'Wash Bike'
// })

// const t2 = new Task({
//     description: 'vfddvd',
//     completed: true
// })

// t2.save()
// .then(task => {
//     console.log(task)
// }).catch(error => {
//     console.log(error)
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         require: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate (value) {
//             if (value < 0) {
//                 throw new Error('age must be a positive number')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate (value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate (value) {
//            if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password must not include "password" in it')
//             }
//         }
//     }
// })

// const u = new User({
//     name: ' wan ',
//     email: 'ww@com       ',
//     age:26,
//     password: 'password'
// })

// u.save()
// .then(u => {
//     console.log(u)
// }).catch(error => {
//     console.log('error ', error)
// })
// const Task = mongoose.model('Task', {
//     description: {type: String},
//     completed: {type: Boolean}
// })

// const t1 = new Task({
//     description: 'Wash Bike',
//     completed: false
// })

// t1.save().then(user => {
//     console.log(user)
// }).catch(error => {
//     console.log('error ', error)
// })


// const User = mongoose.model('User', {
//     name: { type: String },
//     age: { type: Number }
// })

// const u1 = new User({
//     name: 'pawan',
//     age: 26
// })

// u1.save().then((user) => {
//     console.log(user)
// }).catch(error => {
//     console.log('error: ', error)
// })