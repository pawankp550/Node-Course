const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3f7d8cebe7f9dc6676e0cda89fad7676/${latitude},${longitude}`

    request({url, json: true}, (error, { body }) => {
        if(error){
          callback('cannot connect to internet', undefined)
      } else if(body.error){
          callback('Invalid Query', undefined)
      } else{
          callback(undefined, `${body.daily.data[0].summary} It is currently ${body.hourly.data[0].temperature}`)
      }
     })
}

module.exports = foreCast