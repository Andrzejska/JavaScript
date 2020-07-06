//important data
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var time = 180;
var rightPressed = false
var leftPressed = false
var upPressed = false
var downPressed = false
var squareSide = 50;
var playerRadius = 25;
var userName = "Admin"
var countingSpeed = 200;
var numberOfSquares = 25;
var timeAreA = document.getElementById("timeArea");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var moveValue = 5;

//models
class Coordinates {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }
    set setX(x) {
        this.x = x;
    }
    set setY(y) {
        this.y = y
    };
    changeCoordinates(pX, pY) {
        this.x += pX;
        this.y += pY;
    }

}


class Square {
    constructor(coord) {
        this.timeOfLiving = parseInt(Math.random() * 17 + 50);
        this.currentNumber = 20;
        this.coord = coord;
        this.interval = null;
    }
    get getCoordinate() {
        return this.coord
    }
    drawNumberOnSquare() {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.font = "bold 15px Helvetica, Arial, sans-serif";
        ctx.fillText(this.currentNumber, this.coord.getX + 15, this.coord.getY + 31);
        ctx.fill()
        ctx.closePath()
    }
    drawSquare() {
        ctx.beginPath();
        ctx.rect(this.coord.getX, this.coord.getY, squareSide, squareSide);
        ctx.fillStyle = (this.currentNumber > 0) ? 'green' : 'red'
        ctx.fill();
        ctx.closePath();
        this.drawNumberOnSquare(this.currentNumber, this.coord.getX, this.coord.getY);
    }
    countDown() {
        this.currentNumber--;
    }
}

class Player {
    constructor(name, score, coord) {
        this.name = name
        this.score = score
        this.coord = coord
    }

    get getCoordinate() {
        return this.coord
    }

    get getName() {
        return this.name
    }

    get getScore() {
        return this.score
    }
    set setScore(value) {
        this.score = score;
    }
    addScore(value) {
        this.score += value;
    }
    checkOutOfBorder() {
        if (this.coord.getX > canvas.width) this.coord.setX = 0;
        if (this.coord.getX < 0) this.coord.setX = canvas.width;
        if (this.coord.getY > canvas.height) this.coord.setY = 0;
        if (this.coord.getY < 0) this.coord.setY = canvas.height;
    }
    drawPlayer(ctx) {
        ctx.beginPath();
        ctx.arc(this.coord.getX, this.coord.getY, playerRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#4790DB';
        ctx.fill();
        ctx.closePath();
    }



    move() {

        if (rightPressed) {
            this.coord.changeCoordinates(moveValue, 0)
        } else if (leftPressed) {
            this.coord.changeCoordinates(-moveValue, 0)
        } else if (upPressed) {
            this.coord.changeCoordinates(0, -moveValue)
        } else if (downPressed) {
            this.coord.changeCoordinates(0, moveValue)
        }
    }
}

class ourMap {
    constructor(listOfPlayers, listOfSquares, currentPlayer, ctx, ) {
        this.players = listOfPlayers;
        this.squares = listOfSquares;
        this.player = currentPlayer;
        this.ctx = ctx;
        for (var i = 0; i < ((numberOfSquares)); i++) {
            var X = Math.floor(Math.random() * canvas.width);
            var Y = Math.floor(Math.random() * canvas.height);
            this.squares.push(new Square(new Coordinates(X, Y)))

        }
    }

    checkCrossingSquaresWithSquares(x, y) {
        var X = Math.abs(x + (squareSide / 2) - this.player.getCoordinate.getX);
        var Y = Math.abs(y + (squareSide / 2) - this.player.getCoordinate.getY);
        if (Math.sqrt((X * X) + (Y * Y)) < (playerRadius + (squareSide / 2))) return false;

        for (var j = 1; j < this.squares.length; j++) {
            var X = Math.abs((this.squares[j].getCoordinate.getX + squareSide / 2) - (x + squareSide / 2))
            var Y = Math.abs((this.squares[j].getCoordinate.getY + squareSide / 2) - (y + squareSide / 2))
            if (Math.sqrt((X * X) + (Y * Y)) < (squareSide * Math.sqrt(2))) return false;
        }
        return true;
    }
    checkCrossingSquaresWithPlayer() {
        for (var i = 0; i < this.squares.length; i++) {
            var X = Math.abs(this.squares[i].getCoordinate.getX + squareSide / 2 - this.player.getCoordinate.getX)
            var Y = Math.abs(this.squares[i].getCoordinate.getY + squareSide / 2 - this.player.getCoordinate.getY)
            if (Math.sqrt((X * X) + (Y * Y)) < (playerRadius + (squareSide / 2))) {
                this.player.addScore(this.squares[i].currentNumber)
                delete this.squares[i];
                this.squares.splice(i, 1);
                this.createSquare(1);
                break;
            }

        }
    }

    createSquare(n) {
        for (var i = 0; i < n; i++) {
            do {
                var X = Math.floor(Math.random() * canvas.width);
                var Y = Math.floor(Math.random() * canvas.height);
            }
            while (!this.checkCrossingSquaresWithSquares(X, Y))
            this.squares.push(new Square(new Coordinates(X, Y)))
        }
    }
    drawSquares() {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].drawSquare();
            if (this.squares[i].timeOfLiving + this.squares[i].currentNumber < 0) {
                delete this.squares[i];
                this.squares.splice(i, 1);
                this.createSquare(1)
            }
        }
    }



    changeMyScore() {
        document.getElementsByTagName("p")[0].innerHTML = "Your score is ".concat(this.player.getScore)
    }

    changeTopPlayers() {
        for (var i = 0; i < this.players.length - 1; i++) {
            for (var j = 0; j < this.players.length - i - 1; j++) {
                if (this.players[j].getScore < this.players[j + 1].getScore) {
                    tmp = this.players[j];
                    this.players[j] = this.players[j + 1];
                    this.players[j + 1] = tmp;
                }
            }
        }
    }
}


//default data
topPlayers = [new Player("Julik", 233, 1), new Player("Andrew", 11, 2), new Player("Wlada", 2, 3)];
playMap = null

function submitName() {
    requestAnimationFrame(draw);
    numberOfSquares = document.forms['nick']['numberOfSquares'].value;
    console.log(numberOfSquares)
    myNick = document.forms['nick']['fname'].value;
    playMap = new ourMap(topPlayers, [], new Player(myNick, 0, new Coordinates(15, 15)), ctx);;
    countingInterval = setInterval(countDown, countingSpeed)
    timeInterval = setInterval(difficulty, 1000);

}

//helper function
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    } else if (e.keyCode == 38) {
        upPressed = true;
    }

}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    } else if (e.keyCode == 38) {
        upPressed = false;
    }

}

function countDown() {
    for (var i = 0; i < playMap.squares.length; i++) {
        playMap.squares[i].countDown();
    }
}

function difficulty() {
    time--;
    timeArea.textContent = "Time to the end of the game --> ".concat(time);
    if (time % 60 == 0) {
        countingSpeed -= 200;
        moveValue += 5;
        playMap.createSquare(4);
    }
}

function endOfTheGame() {
    cancelAnimationFrame(draw);
    clearInterval(timeInterval);
    clearInterval(countingInterval);
    window.alert("end of the game\n Your score is -->".concat(playMap.player.getScore))
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playMap.player.drawPlayer(ctx);
    playMap.drawSquares();
    playMap.player.move();
    playMap.player.checkOutOfBorder();
    playMap.checkCrossingSquaresWithPlayer();
    playMap.changeMyScore();
    playMap.changeTopPlayers();
    requestAnimationFrame(draw);
    setTimeout(endOfTheGame, 180500);
}

//Leader table
const template = document.createElement('template');
template.innerHTML = `
<table style="width:15%">
        <tr>
            <th>Top players :</th>
        </tr>
        <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
        </tr>
        <tr>
            <th>1</th>
            <th>Julik</th>
            <th>233</th>
        </tr>
        <tr>
            <th>2</th>
            <th>Andrew</th>
            <th>11</th>

        </tr>
        <tr>
            <th>3</th>
            <th>Wlada</th>
            <th>2</th>
        </tr>


    </table>
`;
class LeaderTable extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({
            'mode': 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

    }
}

window.customElements.define('leader-table', LeaderTable)