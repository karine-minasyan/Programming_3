var LiveForm = require("./LiveForm.js");
var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var Predator = require("./Predator.js");
var Explosive = require("./Explosive.js");
var random = require("./random.js");


module.exports = class Balancer extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.time = 0;
    }

    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (grassArr.length > grassEaterArr.length) {
                var newGrassEater = new GrassEater(this.x, this.y, 2);
                grassEaterArr.push(newGrassEater);
                grassEaterCount++;
                matrix[this.y][this.x] = 2;
                matrix[newY][newX] = this.index;
                this.y = newY;
                this.x = newX;
            }
            else if (grassArr.length < grassEaterArr.length) {
                var newGrass = new Grass(this.x, this.y, 1);
                grassArr.push(newGrass);
                grassCount++;
                matrix[this.y][this.x] = 1;
                matrix[newY][newX] = this.index;
                this.y = newY;
                this.x = newX;
            }
            else if (grassArr.length == grassEaterArr.length) {
                matrix[this.y][this.x] = 4;
                var newExplosive = new Explosive(newCell[0], newCell[1], 4);
                explosiveArr.push(newExplosive);
                explosiveCount++;
                matrix[newY][newX] = this.index;
                this.y = newY;
                this.x = newX;
            }

        }
    }

}