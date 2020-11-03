const path = require('path')
const express = require('express')
const hbs = require("hbs")
const localizationHelper = require('./utils/geo-localization')
const weatherHelper = require('./utils/weather')

const app = express()
const port = 3000

// Define paths for express configuration.
const publicDirectoryPath = path.join(__dirname, "..", "public")
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// setting handlebars dynamic engine and views location for express
app.set("view engine" , "hbs")
app.set("views", viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Gustavo Mayo"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Gustavo Mayo"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Gustavo Mayo",
        description: "Help text"
    })
})

app.get('/weather', (req, res) => {
    
    const cityInput = req.query.address
    if (!cityInput) {
        return res.send({
            error: "You must provide an address."
        })
    }

    localizationHelper.getGeoLocalization(cityInput, (error, output) => {

        if (error) {
            return res.send({ error: error })
        }

        weatherHelper.getWeather(output.latitude, output.longitude, (error, output) => {

            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: output.description,
                location: output.location,
                input: cityInput
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorDescription: "The help article can not be found.",
        name: "Gustavo Mayo",
        title: "404 Help"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorDescription: "Page not found.",
        name: "Gustavo Mayo",
        title: "404"
    })
})


app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port)
})