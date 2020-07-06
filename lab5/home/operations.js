var expect = require('chai').expect;
const fs = require('fs');


function add(x, y) {
    return x + y;
}

function divide(x, y) {
    return x / y;
}

function multiply(x, y) {
    return x * y;
}

function substract(x, y) {
    return x - y;
}

function initOperations() {
    fs.readFile(process.argv[2], 'utf8', (err, text) => {
        const data = JSON.parse(text)
        result = 0
        for (var i = 0; i < data.operations.length; i++) {
            switch (data.operations[i]) {
                case ('+'):
                    result = add(data.numbers[i], data.numbers[i + 1]);
                    data.numbers[i + 1] = result
                    break;
                case ('*'):
                    result = multiply(data.numbers[i], data.numbers[i + 1]);
                    data.numbers[i + 1] = result
                    break
                case ('-'):
                    result = substract(data.numbers[i], data.numbers[i + 1]);
                    data.numbers[i + 1] = result
                    break;
                case ('/'):
                    result = divide(data.numbers[i], data.numbers[i + 1]);
                    data.numbers[i + 1] = result
                    break;
                default:
                    break;
            }

        }
        console.log(result)
    })
}



initOperations()