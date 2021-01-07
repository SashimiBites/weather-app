const request = require("postman-request");

const geocode = (address, callback) => {
    const GEOLOCATION_KEY = "pk.eyJ1Ijoic2FiaTIyMTciLCJhIjoiY2tqajUzcGs2MWxkZDJxdGdqeDh3ZTU5cSJ9.WOZ0O-7eB5z9FJvp6gJ9Dw";
    const geolocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${GEOLOCATION_KEY}&limit=1`;

    request({url: geolocationURL, json: true}, (error, {body}) => {
        if(error) {
            callback(error, undefined);
        } else if(body.features.length === 0) {
            callback("Unable to find location", undefined);
        } else {
            callback(error, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
};

module.exports = geocode;

