//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')
const geocode = require('./geocode')

const forecast = (address, callback) => {
    geocode(address, (error, {latitude,longitude}={}) => {
        //console.log(data)
        if (error) callback(error)
        else {
            const url = 'http://api.weatherstack.com/current?access_key=9258438f1b9a23bc20db8a2dc74e9d0a&query=' + latitude + ',' + longitude
            request({ url: url, json: true }, (error, response) => {
                if (error) {
                    callback(error);
                }
                else {
                    callback(undefined, response);
                }
            })
        }

    })
}


module.exports = forecast;



// forecast('london', (error, data) => {
//     if(error) console.log('Error', error)
//     else console.log(`The temperature in ${data.body.location.name} is ${data.body.current.temperature} C`)
//   })