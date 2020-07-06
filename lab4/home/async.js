var http = require('http');
var fs = require('fs');
var url = require("url");


http.createServer(function (request, response) {
  var url_parts = url.parse(request.url, true); //parsing (relative) URL
  if (url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
    var path = url_parts.query['name']; //Read the contents of the field (form) named 'name'
    console.log("Creating a response header")
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    }); //Creating an answer header - we inform the browser that the body of the answer will be plain text
    console.log("Creating the body of the response")
    fs.lstat(path, function (err, file) {
      if (err) {
        response.write("There is no such a file");
        response.end;
      }
      if (file.isDirectory()) {
        response.write(path.concat(" -- is Directory"));
        response.end()
      } else if (file.isFile()) {
        response.write(path.concat(" -- is File"))
        fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            response.write(err);
            response.end()
          }
          response.write(data);
          response.end()
        });
      }
    })

    console.log("Sending a response")
  } else { //Generating the form
    console.log("Creating a response header")
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    }); //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
    //and now we put an HTML form in the body of the answer
    console.log("Creating a response body")
    response.write('<form method="GET" action="/submit">');
    response.write('<label for="name">Enter file name</label>');
    response.write('<input name="name">');
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('</form>');
    response.end(); //The end of the response - send it to the browser
    console.log("Sending a response")
  }
}).listen(8083, '127.0.0.1');
console.log('Server is ready on port 8083.');