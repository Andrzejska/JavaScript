score = 0

function changeLevel() {
    do {
        randomN = Math.floor((Math.random() * 6) + 1);
        headers = document.getElementsByTagName("h".concat(randomN));
    } while (headers.length === 0);
    randomHeader = Math.floor((Math.random() * headers.length));
    newHeaderLevel = (Math.floor(Math.random() * 6) + 1);
    var newHeader = document.createElement("h".concat(newHeaderLevel));
    oldHeader = headers[randomHeader]
    newHeader.setAttribute("onclick", "addPointsHeader(".concat(newHeaderLevel).concat(")"));
    newHeader.appendChild(document.createTextNode("Naglówek poziomu ".concat(newHeaderLevel)));
    oldHeader.parentNode.replaceChild(newHeader, oldHeader);

}



function addText() {
    elements = document.querySelectorAll(' h1, h2, h3, h4, h5, h6, p');
    randomElement = Math.floor((Math.random() * elements.length));
    newParagraph = document.createElement("p");
    text = document.createTextNode("Treść akapitu");
    newParagraph.appendChild(text);
    newParagraph.setAttribute("onclick", "addPointsParagraph(event)")
    elements[randomElement].parentNode.insertBefore(newParagraph, elements[randomElement].nextSibling);
}

function startGame() {
    randomTime = (Math.floor((Math.random() * 1000) + 500))
    var run = window.setInterval(function () {
        randomFunction = (Math.floor((Math.random() * 2) + 1));
        (randomFunction === 1) ? addText(): changeLevel();
        headers = document.querySelectorAll('p')
        if (headers.length === 5) {
            clearInterval(run);
            alert("Game over.Your score -->".concat(score));
        }
    }, 1000);
}

function addPointsHeader(headerValue) {
    score += headerValue;
}

function addPointsParagraph(event) {
    score -= 1;
    event.target.remove()
}