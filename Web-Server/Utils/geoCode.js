const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGF3YW5rcDU1MCIsImEiOiJjanl5MG1mN2wwdnIyM2NtZXZueDF2N296In0.pX8uLRZxNRCOUbOqzfX-ZA&limit=1`

    request({ url, json: true }, (error, { body }) => {

        if(error){
            callback('cannot connect to internet', undefined)
        } else if(body.features.length === 0){
            callback('Invalid Query', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                cityName: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
