const path = require('path');
const xml2js = require('xml2js');
const https = require('https');
const express = require('express');
const app = express();

const port = 8081;
app.use(express.static(__dirname));

const parser = new xml2js.Parser();
const url =
    'https://journals.agh.edu.pl/csci/oai?verb=GetRecord&metadataPrefix=oai_dc&identifier=';

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/:identifier', (req, res) => {
    const identifier = decodeURIComponent(req.params.identifier);
    https.get(url + identifier, (response) => {
        let body = '';
        response.on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            parser.parseString(body, (err, parsedData) => {
                try {
                    const data = parsedData['OAI-PMH'].GetRecord[0].record[0].header[0];
                    res.send({
                        identifier: data.identifier[0],
                        datestamp: data.datestamp[0],
                        setSpec: data.setSpec[0],
                        status: data['$'].status,
                    });
                } catch (e) {
                    console.log(e)
                }
            });
        });;
    });
});

app.listen(port);
console.log("App is listening at port " + port);