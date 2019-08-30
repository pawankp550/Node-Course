require('../src/db/mongoose')
const User = require('../src/models/users')

// User.findByIdAndUpdate('5d5eaf1d1e72ec06b0989728', {age: 55}, {new: true}).then(result => {
//     console.log(result)
//     return User.countDocuments({age: 55})
// })
// .then(result => {
//     console.log(result)
// })
// .catch(error => {
//     console.log(error)
// })

const changeAgeAndGetCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age }, { new: true })
    const count = await User.countDocuments({ age })

    return count
}

changeAgeAndGetCount('5d5eaf1d1e72ec06b0989728', 55)
.then(result => {
    console.log(result)
})
.catch(e => {
    console.log('error ', e)
})