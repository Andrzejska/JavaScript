//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('\n<h1>1+2=3</h1>')
         .end(done);
      });
});

describe('GET /add/1/2', function() {
    it('respond with html', function(done) {
       server
       .get('/add/1/2')
       .expect('1+2=3')
       .end(done);
    });
});
