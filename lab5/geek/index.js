const express = require("express");
const app = express();
const pug = require("pug");




//Required by pug 
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log("here i am");
});

app.listen(8000, () => {
    console.log("App listening on the port 8000");
});