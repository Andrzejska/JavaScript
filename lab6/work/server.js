const fetch = require("node-fetch");
const express = require("express")
const app = express();

var port = 8081

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port);
console.log("The server is listening on the port " + port)


app.get('/:N/:M', async (req, res) => {
    var i;
    var j;
    var marks = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    var subjects = ["English", "JS", "Mownit", "BD", "SO", "TAIJF", "TC"];
    var subjectsToSend = []
    for (i = 0; i < req.params.N; i++) {
        var marksToSend = []
        for (j = 0; j < req.params.M; j++) {
            marksToSend.push(marks[Math.floor(Math.random() * Math.floor(marks.length))])
        }
        subjectsToSend.push({
            name: subjects[Math.floor(Math.random() * Math.floor(subjects.length))],
            marks: marksToSend
        })
    }

    res.json(
        JSON.stringify(subjectsToSend)
    );
    res.end
});

// http://localhost:8081/3/2