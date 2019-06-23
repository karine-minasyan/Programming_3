var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Grass extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
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
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 5) {
            grassCount++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            let grass = new Grass(x, y, this.index);
            grassArr.push(grass);
            this.multiply = 0;
        }
    }
}