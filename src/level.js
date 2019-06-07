export default class Level {
    constructor(x, y) {

    }


}

class Cell {
    constructor(i, j) {
        // position
        this.i = i;
        this.j = j;
        // left, up, right, down
        this.walls = [true, true, true, true];
        // if visted
        this.visted = false;
    }
}

function wilson_algo() {

}
