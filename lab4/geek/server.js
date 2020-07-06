const http = require('http')
const url = require('url')
const managingDB = require('./managingDB.js');

http.createServer(async function (request, response) {
  var url_parts = url.parse(request.url, true);
  if (url_parts.pathname == '/submit') {
    var teacherName = url_parts.query['teacherName'];
    var lessonName = url_parts.query['lessonName'];
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    resultTeachers = await managingDB.allTeachersLessons(teacherName);
    resultLesson = await managingDB.allLessonsStudents(lessonName);
    response.write((teacherName == '' ? resultLesson : resultTeachers));
    response.end();
    console.log("Sending a response")
  } else if (url_parts.pathname == '/addStudent') {
    var firstName = url_parts.query['firstName'];
    var lastName = url_parts.query['lastName'];
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    result = await managingDB.addStudent(firstName, lastName)
    response.write(("The student was successfully added"))
    response.end()
  } else { //Generating the form
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    response.write('<form method="GET" action="/submit">');
    response.write('<label for="name">Enter teacher name</label>');
    response.write('<input name="teacherName">');
    response.write('<br>');
    response.write('<label for="name">Enter lesson name</label>');
    response.write('<input name="lessonName">')
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('<input type="reset">');
    response.write('</form>');
    response.write('<form method="GET" action="/addStudent">');
    response.write('<label for="name">Enter student firstname</label>');
    response.write('<input name="firstName">');
    response.write('<br>');
    response.write('<label for="name">Enter student lastname</label>');
    response.write('<input name="lastName">')
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('<input type="reset">');
    response.write('</form>');
    response.end();
    console.log("Sending a response")
  }
}).listen(8081);
console.log("The server was started on port 8081");
console.log("To end the server, press 'CTRL + C'");

//node server.js