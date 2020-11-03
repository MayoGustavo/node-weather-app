const request = require("request")

const getGeoLocalization = (city, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(city)+".json?access_token=pk.eyJ1IjoibWFndXNtZWRpdmgiLCJhIjoiY2tnaWhmcHY0MGMzbTJ0bnVidnlsdGlzYSJ9.a7NQicXqYvhPhg9T7AByAg&limit=1"

    request({url, json:true}, (error, {body} = {}) => {

        if (error)
        {
            callback("Unable to contact geo localization service.", undefined)
        }
        else if (body.message || body.features.length == 0) 
        {
            callback("Unable to find the specified city.", undefined)
        }
        else
        {
            callback(undefined, {
                place_name: body.features[0].place_name,
                latitude: body.features[0].center[1].toString(),
                longitude: body.features[0].center[0].toString()
            })
        }
    })
}

module.exports = {
    getGeoLocalization : getGeoLocalization
}