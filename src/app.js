const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(publicDirectoryPath);

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public/index.html"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        author: "Kenji Miyashiro"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather App",
        author: "Kenji Miyashiro"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Weather App",
        author: "Kenji Miyashiro"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({ error });
        } 
    
        forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({ error });
            }
    
            res.send(data);
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found"
    });
});

app.listen(port, () => {
    console.log("App Running on port " + port);
});