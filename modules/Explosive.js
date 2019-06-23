var LiveForm = require("./LiveForm.js");
var random = require("./random.js");


module.exports = class Explosive extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.time = 0;
    }
    kill() {
        this.time++;
        if (this.time >= 5) {

            var grassCell = this.chooseCell(1);
            var grassEaterCell = this.chooseCell(2);
            var predatorCell = this.chooseCell(3);
            var explosiveCell = this.chooseCell(4);
            var balancerCell = this.chooseCell(5);
            var objects = grassCell.concat(grassEaterCell, predatorCell, explosiveCell, balancerCell);
            matrix[this.y][this.x] = 0;
            for (var i in explosiveArr) {
                if (this.x == explosiveArr[i].x && this.y == explosiveArr[i].y) {
                    explosiveArr.splice(i, 1);
                    break;
                }
            }
            for (var i in objects) {
                var x = objects[i][0];
                var y = objects[i][1];
                matrix[y][x] = 0;
                for (var j in grassArr) {
                    if (x == grassArr[j].x && y == grassArr[j].y) {
                        grassArr.splice(j, 1);
                        break;
                    }
                }
                for (var j in grassEaterArr) {
                    if (x == grassEaterArr[j].x && y == grassEaterArr[j].y) {
                        grassEaterArr.splice(j, 1);
                        break;
                    }
                }
                for (var j in predatorArr) {
                    if (x == predatorArr[j].x && y == predatorArr[j].y) {
                        predatorArr.splice(j, 1);
                        break;
                    }
                }
                for (var j in explosiveArr) {
                    if (x == explosiveArr[j].x && y == explosiveArr[j].y) {
                        explosiveArr.splice(j, 1);
                        break;
                    }
                }
                for (var j in balancerCell) {
                    if (x == balancerArr[j].x && y == balancerArr[j].y) {
                        balancerArr.splice(j, 1);
                        break;
                    }
                }

            }
            this.time = 0;
        }
    }
}