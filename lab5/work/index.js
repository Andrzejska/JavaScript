const express = require('express');
const pug = require('pug');
const fetch = require("node-fetch");
const app = express();



app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/byCountryLive/:fromDate/:toDate/:country1/:country2/:country3', async (req, res) => {

    //Parsing the input from the url
    var countries = [req.params.country1, req.params.country2, req.params.country3];
    var dates = [];
    var fromDate = new Date(req.params.fromDate);
    var toDate = new Date(req.params.toDate);

    //Getting the data
    for (var j = 0; j < 3; j++) {
        var urlLive = 'https://api.covid19api.com/country/' + countries[j] + '/status/confirmed/live';
        var body = await getData(urlLive);
        var numberOfInserted = 0;
        for (var i = 0; i < body.length; i++) {
            var currentDate = await new Date(body[i].Date);
            if (currentDate > fromDate && currentDate < toDate) {
                if (j == 0) dates.push([currentDate.toDateString()]);
                dates[numberOfInserted++].push(body[i].Cases);

            }
        }
    }
    //Rendering the pug template
    res.render('by-country-live', {
        country1: countries[0],
        country2: countries[1],
        country3: countries[2],
        dates: dates
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


app.get('/summary/:parametr', async (req, res) => {
    var summaryUrl = 'https://api.covid19api.com/summary';

    var countries = [];
    var parametr = req.params.parametr;
    var body = await getData(summaryUrl);
    var totalValue = 0;
    for (var i = 0; i < body.Countries.length; i++) {
        countries.push([await body.Countries[i].Country, await body.Countries[i][parametr]])
        totalValue += await body.Countries[i][parametr];
    }
    countries.unshift(["Summary", totalValue]);


    //Sorting the output array
    for (var i = 1; i < countries.length; i++) {
        for (var j = 0; j < countries.length - 1 - i; j++) {
            if (countries[j][1] < countries[j + 1][1]) {
                var tmp = countries[j];
                countries[j] = countries[j + 1];
                countries[j + 1] = tmp;
            }
        }
    }

    res.render('summary', {
        parametr: parametr,
        countries: countries
    })
});
app.listen(8000, () => {
    console.log('Listening on port 8000!');
});

// By country Live http://localhost:8000/byCountryLive/2020-05-20/2020-05-27/Switzerland/Poland/Ukraine
// Summary http://localhost:8000/summary/NewConfirmed