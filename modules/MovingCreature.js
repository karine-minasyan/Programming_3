var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class MovingCreature extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }
}