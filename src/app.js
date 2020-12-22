const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Navaneeth Krishnan S",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Ask me anything!",
    title: "Help",
    name: "Navaneeth Krishnan S",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Navaneeth Krishnan S" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address not provided",
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({error:err});
    } else {
      forecast(latitude, longitude, (error, data) => {
        if (error) {
            return res.send({error});
        } else {
            res.send({ address: req.query.address, forecast: data, location});
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "Navaneeth Krishnan S",
    errorMessage: "Unknown help sub Route",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not Found",
    name: "Navaneeth Krishnan S",
    errorMessage: "Unknown Route",
  });
});

app.listen(3000, () => {
  console.log(`Server started`);
});
