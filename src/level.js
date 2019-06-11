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
                let path = [[i, j]];
                let lastP = path[path.length - 1];
                let prev = undefined;
                // while not in maze
                while (!this.maze[lastP[0]][lastP[1]].inMaze) {
                    // find a random path to maze
                    path.push(this.maze[lastP[0]][lastP[1]].nextNeighbor(prev, this.row, this.col));
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
        //corners
        if (this.i - 1 < 0 && this.j - 1 < 0) { //top left
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j+1],
                [this.i+1, this.j]];
                let rand = Math.floor(Math.random() * 2); // 0 or 1
                return neighbors[rand];
            } else if (prev.i > this.i)
                return [this.i, this.j + 1];
            else
                return [this.i + 1, this.j];
        } else if (this.i - 1 < 0 && this.j + 1 >= col) { //top right
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j-1],
                [this.i+1, this.j]];
                let rand = Math.floor(Math.random() * 2); // 0 or 1
                return neighbors[rand];
            } else if (prev.i < this.i)
                return [this.i, this.j - 1];
            else
                return [this.i + 1, this.j];
        } else if (this.i + 1 >= row && this.j + 1 >= col) { //bottom right
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j-1],
                [this.i-1, this.j]];
                let rand = Math.floor(Math.random() * 2); // 0 or 1
                return neighbors[rand];
            } else if (prev.i < this.i)
                return [this.i, this.j - 1];
            else
                return [this.i - 1, this.j];
        } else if (this.i + 1 >= row && this.j - 1 < 0) { //bottom left
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j+1],
                [this.i-1, this.j]];
                let rand = Math.floor(Math.random() * 2); // 0 or 1
                return neighbors[rand];
            } else if (prev.i > this.i)
                return [this.i, this.j + 1];
            else
                return [this.i - 1, this.j];
        // edges
        } else if (this.i - 1 < 0) { //top edge
            let neighbors = [
            [this.i, this.j-1],
            [this.i, this.j+1],
            [this.i-1, this.j]];
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev.i < this.i)
                return neighbors[rand]; // 0/1
            else if (prev.j < this.j)
                return neighbors[rand + 1]; // 1/2
            else
                return neighbors[rand * 2]; // 0/2
        } else if (this.i + 1 >= row) {//bottom edge
            let neighbors = [
            [this.i, this.j-1],
            [this.i, this.j+1],
            [this.i+1, this.j]];
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev.i > this.i)
                return neighbors[rand]; // 0/1
            else if (prev.j < this.j)
                return neighbors[rand + 1]; // 1/2
            else
                return neighbors[rand * 2]; // 0/2
        } else if (this.j - 1 < 0) {//left edge
            let neighbors = [
            [this.i, this.j+1],
            [this.i+1, this.j],
            [this.i-1, this.j]];
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev.j > this.j)
                return neighbors[rand + 1]; // 1/2
            else if (prev.i > this.i)
                return neighbors[rand * 2]; // 0/2
            else
                return neighbors[rand]; // 0/1
        } else if (this.j + 1 >= col) {//right edge
            let neighbors = [
            [this.i, this.j-1],
            [this.i+1, this.j],
            [this.i-1, this.j]];
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev.j < this.j)
                return neighbors[rand + 1]; // 1/2
            else if (prev.i > this.i)
                return neighbors[rand * 2]; // 0/2
            else
                return neighbors[rand]; // 0/1
        // inside
        } else { //inside
            let rand = Math.floor(Math.random() * 3); // 0 to 2
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j-1],
                [this.i, this.j+1],
                [this.i-1, this.j],
                [this.i+1, this.j]];
                rand = Math.floor(Math.random() * 4);
                return neighbors[rand];
            } else if (prev.i < this.i) {
                let neighbors = [
                [this.i, this.j-1],
                [this.i, this.j+1],
                [this.i+1, this.j]];
                return neighbors[rand];
            } else if (prev.j < this.j) {
                let neighbors = [
                [this.i, this.j+1],
                [this.i+1, this.j],
                [this.i-1, this.j]];
                return neighbors[rand];
            } else if (prev.i > this.i) {
                let neighbors = [
                [this.i, this.j-1],
                [this.i, this.j+1],
                [this.i-1, this.j]];
                return neighbors[rand];
            } else {
                let neighbors = [
                [this.i, this.j-1],
                [this.i+1, this.j],
                [this.i-1, this.j]];
                return neighbors[rand];
            }
        }
    }
}




