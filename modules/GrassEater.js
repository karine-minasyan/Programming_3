var MovingCreature = require("./MovingCreature");
var random = require("./random");



module.exports = class GrassEater extends MovingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 15;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.energy >= 20) {
            grassEaterCount++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            let grassEater = new GrassEater(x, y, this.index);
            grassEaterArr.push(grassEater);
            this.energy = 15;
        }

    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.energy += 2;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
        }
    }
    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        }

    }
}