const path = require('path')
const express = require('express')
const hbs = require('hbs')
const foreCast = require('../Utils/foreCast')
const geoCode = require('../Utils/geoCode')

const app = express()
const PORT = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../Templates/views')
const partialDirPath = path.join(__dirname, '../Templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        Title: 'Weather',
        Name: 'Pawan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        Title: 'About Page',
        Name: 'Pawan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Message: 'We are here to help you',
        Title: 'Help',
        Name: 'Pawan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, cityName } = {}) => {
        if(error){
            return res.send({ error })
        }

        foreCast(latitude, longitude, (error, foreCast) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                foreCast,
                location: cityName,
                city: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        ErrorMessage: 'Error 404: help page not found',
        Name: 'Pawan',
        Title:'Error'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        ErrorMessage: 'Error 404: page not found',
        Name: 'Pawan',
        Title:'Error'
    })
})

app.listen(PORT, () => {
    console.log('Server Started')
})