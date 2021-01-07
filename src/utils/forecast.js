const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const WEATHER_STACK_KEY = "f7133c63aaa6a2388a080c36dcd69c86";
    const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_KEY}&query=${latitude},${longitude}`;

    request({url: weatherURL, json: true}, (error, {body}) => {
        if(error) {
            callback(error, undefined);
        } else {
            const weatherInfo = {
                location: body.location.timezone_id,
                country: body.location.country,
                region: body.location.region,
                temperature: body.current.temperature,
                precipitation: body.current.precip
            };
            callback(error, weatherInfo);
        }
    });
};

module.exports = forecast;