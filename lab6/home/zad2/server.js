const fetch = require("node-fetch");
const express = require("express")
const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(8000);
console.log("Listening on the port 8000")

app.get('/:area/:location', async (req, res) => {
    var url = "http://worldtimeapi.org/api/timezone" + "/" + req.params.area + "/" + req.params.location;
    var message = await getData(url);
    res.type('application/json').send({
        datetime: message.datetime
    });
});


const getData = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error);
    }
};

//http://localhost:8000/Europe/London