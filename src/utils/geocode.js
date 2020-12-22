const request = require("request");

const geocode = (address, cb) => {
  const mpbxurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmF2YW5lZXRoa3MiLCJhIjoiY2tkMzdrdmNyMHB0YzMzbnlqaWdsb2tydiJ9.Tv05PwVFEPtsQ-JxZNhq0w&limit=1`;
  request(mpbxurl, { json: true }, (err, res) => {
    if (err) {
      cb("Unable to connect to location service", undefined);
    } else if (res.statusCode === 401) {
      cb(res.body.message, undefined);
    } else if (res.body.features.length === 0) {
      cb("No Results Found", undefined);
    } else {
      let data = {
        latitude: res.body.features[0].geometry.coordinates[1],
        longitude: res.body.features[0].geometry.coordinates[0],
        location: res.body.features[0].place_name,
      };
      cb(undefined, data);
    }
  });
};

module.exports = geocode;
