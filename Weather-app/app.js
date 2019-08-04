const request = require('request')
const url = 'https://api.darksky.net/forecast/3f7d8cebe7f9dc6676e0cda89fad7676/37.8267,-122.4233'

request({ url, json: true }, (error, response) => {
    console.log('The current temerature is: ',response.body.currently.temperature)
})