var express = require('express');
var logger = require('morgan');
var app = express();
var x = 1;
var y = 2;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  //zadanie16
  res.render('index', {
    pretty: true,
    message: x.toString().concat('+').concat(y).concat('=').concat(x + y)
  });
});

//Testy zadanie4
app.get('/add/:x/:y', function (req, res) {
  res.send(req.params.x + "+" + req.params.y + "=" + (parseInt(req.params.x) + parseInt(req.params.y)));
});

app.listen(3000, function () {
  console.log('The application is available on port 3000');
});