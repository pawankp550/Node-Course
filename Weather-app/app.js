const request = require('request')
const geoCode = require('./Utils/geoCode')
const foreCast = require('./Utils/foreCast')

const address = process.argv[2]

if(!address){
    return console.log('Please provide address')
}

geoCode(process.argv[2], (error, { cityName, latitude, longitude }) => {

   if(error) {
       return console.log(error)
       }

    foreCast(latitude, longitude, (error, foreCastData) => {
        if(error){
            return console.log(error)
        }

        console.log(cityName)
        console.log(foreCastData)
    })
})
