var fs = require('fs');

var path = process.argv[2];
if (fs.lstatSync(path).isDirectory()) {
    console.log(path.concat(" -- is Directory"));
} else if (fs.lstatSync(path).isFile()) {
    console.log(path.concat(" -- is File"))
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
}