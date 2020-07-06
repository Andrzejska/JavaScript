var fs = require('fs');
var http = require('http');
var url = require("url");
var path = require('path');

function copyFileSync(source, target) {
    var targetFile = target;
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolder(source, target) {
    var files = [];
    console.log(source, target);
    var targetFolder = path.join(source, target);
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isFile()) {
                copyFileSync(curSource, targetFolder)
            };
        });
    }
    console.log("The directory files ", source, " were copied to ", targetFolder);
}

function modifyAccess(source, target, newMode) {
    var filePath = path.join(source, target);
    fs.chmodSync(filePath, parseInt(newMode));
    console.log("The file ", filePath, "was modified ", "to mode -->", newMode);
}

function parseAllCommands(cCommands) {
    var commands = cCommands.split(' ');
    for (var i = 0; i < commands.length; i++) {
        var command = commands[i].split(':');
        console.log(command[2].split('/')[1]);
        (command[1] == 'copy') ? copyFolder(command[2].split('/')[0], command[2].split('/')[1]): modifyAccess(command[0], command[2].split('/')[0], command[2].split('/')[1]);
    }
}



http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true);
    if (url_parts.pathname == '/submit') {
        var commands = url_parts.query['name'];
        response.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        parseAllCommands(commands);
        response.write("All commands was executed");
        response.end
    } else {

        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="name">Enter your command</label>');
        response.write('<input name="name">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('</form>');
        response.end();
    }
}).listen(8083, '127.0.0.1');
console.log('Server is ready on port 8083.');

//.:copy:./copied
//.:modify:fsUse.js/0o775