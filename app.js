const express = require('express');
const app = express();
const port = process.env.port || 3000;

const path = require('path');
const publicDir = path.join(__dirname, '/public');
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('./index.hbs', {
    title: 'My Webpage',
    message: 'Welcome to my webpage!'
  })
});

const geocode = require('./functions/geocode');
const forcast = require('./functions/forcast');
app.get('/weather', (req, res) => {
    if(!req.query.country)
    {
        return res.send({
            error: 'Please enter a country name to search for !'
        });
    }
    
    geocode(req.query.country, (err, data) => {
        if(err) {
            return res.send({error: err});
        }

        forcast(data.longitude, data.latitude, (err, forecastData) => {
            if(err) {
                return res.send({error: err});
            }

            res.send({
                latitude: data.latitude,
                longitude: data.longitude,
                temperature: forecastData.temperature,
                description: forecastData.description,
                country: forecastData.country
            })
        });
    })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});