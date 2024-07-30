const request = require('request')

const geocode = (country, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + country +  ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";

    request({url, json:true}, (err, res) => {
        if(err)
        {
            callback("We cannot connect to mapbox website", undefined);
        }
        else if(res.body.features.length === 0)
        {
            callback("No results found for the given country", undefined);
        }
        else if(res.body.message)
        {
            callback(res.body.message, undefined);
        }
        else
        {
            const center = res.body.features[0].center;
            callback(undefined, {latitude: center[1], longitude: center[0]});
        }
    })
}

module.exports = geocode;