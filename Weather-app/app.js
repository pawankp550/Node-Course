const request = require('request')
const axios = require('axios')
let latitude = 0
let longitude = 0
const url = `https://api.darksky.net/forecast/3f7d8cebe7f9dc6676e0cda89fad7676/37.8267,`
const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoicGF3YW5rcDU1MCIsImEiOiJjanl5MG1mN2wwdnIyM2NtZXZueDF2N296In0.pX8uLRZxNRCOUbOqzfX-ZA&limit=1'

request({ url, json: true }, (error, response) => {
    if(error){
         console.log('cannot connect to internet')
     } else if(response.body.error){
         console.log('invalid input')
     } else {
         console.log(response.body.currently)
     }
})

request({url: geoUrl, json: true}, (error, response) => {
    if(error){
         console.log('cannot connect to internet')
     } else if(response.body.features.length === 0){
         console.log('Invalid Query')
     } else{
        console.log(response.body.features)
     }
})