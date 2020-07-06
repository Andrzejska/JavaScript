var http = require("http");
var url = require("url");
var fs = require("fs");
var file = 'form.html';

http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true); // parsing (relative) URL

    //Compare the relative URL
    switch (url_parts.pathname) {
        case '/':
            fs.stat(file, function (err, stats) {
                if (err == null) { // If the file exists
                    fs.readFile(file, function (err, data) { // Read it content
                        response.writeHead(200, {
                            "Content-Type": "text/html; charset=utf-8"
                        });
                        response.write(data); // Send the content to the web browser
                        response.end();
                    });
                } else { // If the file does not exists
                    response.writeHead(200, {
                        "Content-Type": "text/plain; charset=utf-8"
                    });
                    response.write('The ' + file + ' file does not exist');
                    response.end();
                } //else
            }); //fs.stat
            break;

            // Process the form content if relative URL is '/submit'
        case '/submit':
            var name = url_parts.query.imie === undefined ? 'Świecie' : url_parts.query.imie
            var welcome = 'Hello World (Witaj ' + name + ')';
            console.log(welcome);
            response.writeHead(200, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            response.write(welcome); // Data (response) that we want to send to the web browser
            response.end(); // Sending the answer
            console.log("The server sent the '" + welcome + "' text to the browser");
            break;

            // Other cases

    } //switch
}).listen(8000);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");

/*Zad5.
Server
    The relative URL of the current request: /submit?
    The server sent the 'Hello World (Witaj Świecie)' text to the browser 
Browser 
    Hello World (Witaj Świecie)
Z Ajax 
    W oknie Hello World (Witaj Świecie)
Z fetch 
    promise

    Zad10
http://localhost:8080/submit?imie=Andrii
*/