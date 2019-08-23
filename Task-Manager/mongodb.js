const { MongoClient, ObjectId } = require('mongodb')

const connectionURl = "mongodb+srv://User:Mongo@12345@cluster0-d2yun.mongodb.net/test?retryWrites=true&w=majority"
const databaseName = "task-manager"

MongoClient.connect(connectionURl, {useNewUrlParser: true}, { useUnifiedTopology: true }, function(error, client){

    if(error){
        return console.log('could not connect')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteMany(
    {
        completed: true
    }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // db.collection('tasks').updateMany(
    //     { completed: false },
    //     {
    //         $set:{
    //             completed: true
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // db.collection('tasks').update(
    //     { _id: new ObjectId('5d5bcf0be3998d06b2ba183e') },
    //     {

    //     $set: {
    //             description: 'wash bike'
    //         }
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('tasks').find({ completed: false }).toArray((error, result) => {
    //     if(error){
    //         return console.log('could not connect')
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').findOne({_id: new ObjectId('5d5bcf0be3998d06b2ba183e')}, (error, result) => {
    //     if(error){
    //         return console.log('could not fetch docs')
    //     }

    //     console.log(result)
    // })



    // db.collection('tasks').insertMany([{
    //     description: 'buy grocery',
    //     completed: false
    // },
    // {
    //     description: 'tef',
    //     completed: false
    // },
    // {
    //     description: 'bicmkx',
    //     completed: true
    // }], (error, result) => {
    //     if(error){}

    //     console.log(result.ops)
    // })


    // db.collection('users').insertOne({
    //     name: 'karan'
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })
})