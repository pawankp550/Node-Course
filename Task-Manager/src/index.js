const express = require('express')
// Mongoose connection
require('./db/mongoose')

const app = express()
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const port = process.env.port || 3000

// no service available
// app.use((req, res, next) => {
//     res.status(503).send('the service is in maintainance mode. Please try again in some time')
// })

// convert json to object
app.use(express.json())

// user endpoints
app.use(userRouter)

// tasks endoints
app.use(taskRouter)

app.listen(port, () => {
    console.log('server started')
})