var express = require('express'),
  logger = require('morgan');
var app = express();
var x = 1;
var y = 2;
//zadanie 18 npm install
//zadanie 20 installed yarn and just types yarn


app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  //zadanie16
  res.send('\n<h1>'.concat(x).concat('+').concat(y).concat('=').concat(x + y).concat('</h1>'));
});

//Testy zadanie4
app.get('/add/:x/:y', function (req, res) {
  res.send(req.params.x + "+" + req.params.y + "=" + (parseInt(req.params.x) + parseInt(req.params.y)));
});



app.listen(3000, function () {
  console.log('The application is available on port 3000');
});