require('../src/db/mongoose')
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete('5d5fe62518c4bf142ac6dc91')
// .then(result => {
//     console.log(result)
//     return Task.countDocuments({completed: false})
// })
// .then(result => {
//     console.log(result)
// })
// .catch(e => {
//     console.log(e)
// })

const deleteTaskAndGetPending = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const pendingTask = await Task.find({ completed: false })

    return pendingTask
}

deleteTaskAndGetPending('5d5fe62518c4bf142ac6dc91')
.then(result => {
    console.log(result)
})
.catch(e => {
    console.log('e ',e)
})