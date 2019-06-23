
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require('./modules/Predator.js');
var Explosive = require('./modules/Explosive.js');
var Balancer = require('./modules/Balancer.js')
let random = require('./modules/random.js');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
explosiveArr = [];
balancerArr = [];
matrix = [];
grassCount = 0;
grassEaterCount = 0;
predatorCount = 0;
explosiveCount = 0;
balancerCount = 0;
weather = '';
weatherIndex = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, explosive, balancer) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < explosive; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < balancer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 100, 50, 20, 10, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y, 1);
                grassArr.push(grass);
                grassCount++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grassEater);
                grassEaterCount++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3);
                predatorArr.push(predator);
                predatorCount++;
            }
            else if (matrix[y][x] == 4) {
                var explosive = new Explosive(x, y, 4);
                explosiveArr.push(explosive);
                explosiveCount++;
            }
            else if (matrix[y][x] == 5) {
                var balancer = new Balancer(x, y, 5);
                balancerArr.push(balancer);
                balancerCount++;
            }

        }
    }
}
creatingObjects();

function game() {
    if (weatherIndex <= 30) {
        weather = 'Spring';
    }
    else if (weatherIndex > 30 && weatherIndex <= 60) {
        weather = 'Summer';
    }
    else if (weatherIndex > 60 && weatherIndex <= 90) {
        weather = 'Autumn';
    }
    else if (weatherIndex > 90 && weatherIndex <= 120) {
        weather = 'Winter';
    }

    if (weatherIndex == 120) {
        weatherIndex = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            if (weather == 'Spring' || weather == 'Summer') {
                grassEaterArr[i].mul();
            }
            grassEaterArr[i].die();

        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            if (weather != 'Summer') {
                predatorArr[i].move();
            }
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
        }
    }
    if (explosiveArr[0] !== undefined) {
        for (var i in explosiveArr) {
            if (weather == 'Summer') {
                explosiveArr[i].kill();
            }
        }
    }
    if (balancerArr[0] !== undefined) {
        for (var i in balancerArr) {
            if (weather != "Autumn") {
                balancerArr[i].move();
            }
        }
    }
    weatherIndex++;

    //! Object to send
    let sendData = {
        matrix: matrix,
        weather: weather,
        grassCounter: grassCount,
        grassEaterCounter: grassEaterCount,
        predatorCounter: predatorCount,
        explosiveCounter: explosiveCount,
        balancerCounter: balancerCount
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
setInterval(game, 1000);