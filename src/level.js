export default class Level {
    constructor(row, col) {
        // handle bad input
        this.row = row;
        this.col = col;
        this.maze = [];
        for (let i = 0; i < row; i++) {
            this.maze[i] = [];
            for (let j = 0; j < col; j++) {
                this.maze[i][j] = new Cell(i, j);
            }
        }
    }

    wilson_algo() {
        // set for elements on the path ([i, j] => [Cell, index])
        // array for the path in the
        // https://github.com/davidbau/seedrandom
        // ^ See for random seed implementation

        for () {
            for () {
                // if cell is already in the maze move to the next one
                if (this.maze[i][j].inMaze == true) continue;
                let path = [];
                while (/*path is not connected to maze*/) {
                    // find a random path to maze
                }
                for (/*length of path*/) {
                    // add each cell of path to maze
                }
            }
        }
    }
}

// change this to a function format
class Cell {
    constructor(i, j) {
        // position
        this.i = i; // row
        this.j = j; // col
        // left, up, right, down
        this.walls = [true, true, true, true];
        // if visted
        this.visted = false;
        this.inMaze = false;
    }

    // returns random next neighbor
    // input: previous Cell, rows in maze, col in maze
    nextNeighbor(prev, row, col) {
        // three cases: corner = 1N, edge = 2N, inside = 3N
        if (/*corner*/) {

        }
    }
}




