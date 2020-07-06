var expect = chai.expect;
'use strict';
i = 0;
value = 0;
counter = 0;

function sum(x, y) {
    return x + y;
}

function countMyself() {
    if (typeof countMyself.counter == 'undefined') countMyself.counter = 0;
}

function cyfry(napis) {
    counter = 0;
    if (napis[0] >= 'a' && napis[0] <= 'z') return 0;
    for (i = 0; i < napis.length; i++)
        if (napis[i] >= '0' && napis[i] <= '9') counter += parseInt(napis[i]);
    return counter;
}

function litery(napis) {
    counter = 0;
    i = 0;
    for (i = 0; i < napis.length; i++)
        if (napis[i] >= 'a' && napis[i] <= 'z') ++counter;
    return counter;
}




function suma(napis) {
    countMyself();
    value = 0;
    i = 0;
    while (napis[i] >= '0' && napis[i] <= '9') {
        value = value * 10 + parseInt(napis[i]);
        i++;
    }
    return countMyself.counter += value;
}


function colaboration() {
    {
        napis = window.prompt("Enter your data");
        x = cyfry(napis);
        y = litery(napis);
        z = suma(napis);
        document.getElementById("enter").innerHTML = "\t" + x + "\t" + y + "\t" + z;

    }
}

describe('The sum() function', function () {
    /////////////////suma(napis)/////////////////////////////////////////////////////  
    it('Returns 123 for 123 suma(napis) ', function () {
        expect(suma("123")).to.equal(123);
    });
    it('Returns 256 for next 123 suma(napis)', function () {
        expect(suma("123")).to.equal(246);
    });
    it('Returns 256 for next abcd suma(napis)', function () {
        expect(suma("abcd")).to.equal(246);
    });
    it('Returns 256 for next abcd123 suma(napis)', function () {
        expect(suma("abcd123")).to.equal(246);
    });
    it('Returns 369 for next 123abcd suma(napis)', function () {
        expect(suma("123abcd")).to.equal(369);
    });
    it('Returns 369 for next "" suma(napis)', function () {
        expect(suma("")).to.equal(369);
    });
    /////////////////cyfry(napis)/////////////////////////////////////////////////////        
    it('Returns 6 for 123 cyfry(napis) ', function () {
        expect(cyfry("123")).to.equal(6);
    });
    it('Returns 0 for next abcd cyfry(napis)', function () {
        expect(cyfry("abcd")).to.equal(0);
    });
    it('Returns 0 for next abcd123 cyfry(napis)', function () {
        expect(cyfry("abcd123")).to.equal(0);
    });
    it('Returns 6 for next 123abcd cyfry(napis)', function () {
        expect(cyfry("123abcd")).to.equal(6);
    });
    it('Returns 0 for next "" cyfry(napis)', function () {
        expect(cyfry("")).to.equal(0);
    });
    /////////////////litery(napis)/////////////////////////////////////////////////////        
    it('Returns 0 for 123 litery(napis) ', function () {
        expect(litery("0")).to.equal(0);
    });
    it('Returns 4 for next abcd litery(napis)', function () {
        expect(litery("abcd")).to.equal(4);
    });
    it('Returns 4 for next abcd123 litery(napis)', function () {
        expect(litery("abcd123")).to.equal(4);
    });
    it('Returns 4 for next 123abcd litery(napis)', function () {
        expect(litery("123abcd")).to.equal(4);
    });
    it('Returns 0 for next "" litery(napis)', function () {
        expect(litery("")).to.equal(0);
    });
});