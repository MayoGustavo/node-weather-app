const request = require("request")

const getWeather = (lat, lon, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=05c63a72b2f57b0996de05e84db56c4e&query="+lat+","+lon+"&unit=m"

    request({url, json:true}, (error, { body } = {}) => {

        if (error) 
        {
            callback("Unable to contact weather service.", undefined)
        } 
        else if (body.error)
        {
            callback(body.error.info, undefined)
        }
        else
        {
            const current = body.current
            const location = body.location

            callback(undefined, {
                description: current.weather_descriptions[0] + ". It is currently " + current.temperature + " degress out. There is a " + current.precip + "% chance of rain.",
                location: location.name + ", " + location.region + ", " + location.country
            })

            
        }
    })
}

module.exports = {
    getWeather : getWeather
}