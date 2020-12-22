const request = require("request");

const forecast = (lat, lon, cb) => {
    const url =  `http://api.weatherstack.com/current?access_key=5e1230fdbd8e96a7ab47573bb1466d77&query=${lat},${lon}`;
    request(url, { json: true }, (err, {body}={}) => {
          if (err) {
            cb("Unable to connect forecast service", undefined)
          } else if (body.success === false) {
            cb(body.error.info, undefined);
          } else {
              let data = {
                  weather: body.current.weather_descriptions[0],
                  temperature: body.current.temperature,
                  feelslike: body.current.feelslike
              }
            cb(undefined, `Weather: ${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`);
          }
        });
}

module.exports = forecast;