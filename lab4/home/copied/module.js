/** Creating Operation class for doing operation on number*/

class Operation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        return this.x + this.y;
    }
}

//7
module.exports = {
    Operation: Operation
}