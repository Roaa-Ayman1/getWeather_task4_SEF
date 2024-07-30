const request = require('request');

const forcast = (lat , long, callback) => {
    const url = "http://api.weatherapi.com/v1/current.json?key=4472dfaa0a9347b6b43210955241507&q=" +long + "," + lat + "&aqi=no";

    request({url, json: true}, (error, res) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } 
        else if (res.body.error) 
        {
            callback(res.body.error.message, undefined);
        } 
        else 
        {
            callback(undefined, {
                temperature: res.body.current.temp_c,
                description: res.body.current.condition.text,
                country: res.body.location.name
            });
        }
    });
}

module.exports = forcast;