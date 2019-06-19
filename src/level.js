export default class Level {
    constructor(row, col) {
        // TODO handle bad input
        this.row = row;
        this.col = col;
        // this.cellSize of cell
        this.cellSize = 256;
        this.maze = [];
        for (let i = 0; i < this.row; i++) {
            this.maze[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.maze[i][j] = new Cell(i, j);
            }
        }
    }

    draw(ctx) {
        // sets canvas to fit # of cells
        ctx.canvas.width = (this.col * this.cellSize);
        ctx.canvas.height = (this.row * this.cellSize);
        let wallW = 1;//Math.floor(this.cellSize / 4);
        // draws the cells onto the canvas
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                // ctx.fillStyle = '#A0A0A0';
                ctx.fillStyle = '#FFFFFF';
                // if (this.maze[i][j].isGoal)
                //     ctx.fillStyle = '#00FF00';
                ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                ctx.fillStyle = '#FFFFFF';
                if (this.maze[i][j].walls[0]) {// left wall
                    ctx.beginPath();
                    ctx.moveTo(j * this.cellSize, i * this.cellSize);
                    ctx.lineTo(j * this.cellSize, i * this.cellSize + this.cellSize);
                    ctx.lineWidth = wallW;
                    ctx.stroke();
                }
                if (this.maze[i][j].walls[1]) {// top wall
                    ctx.beginPath();
                    ctx.moveTo(j * this.cellSize, i * this.cellSize);
                    ctx.lineTo(j * this.cellSize + this.cellSize, i * this.cellSize);
                    ctx.lineWidth = wallW;
                    ctx.stroke();
                }
                if (this.maze[i][j].walls[2]) {// right wall
                    ctx.beginPath();
                    ctx.moveTo(j * this.cellSize + this.cellSize, i * this.cellSize + this.cellSize);
                    ctx.lineTo(j * this.cellSize + this.cellSize, i * this.cellSize);
                    ctx.lineWidth = wallW;
                    ctx.stroke();
                }
                if (this.maze[i][j].walls[3]) {// bottom wall
                    ctx.beginPath();
                    ctx.moveTo(j * this.cellSize + this.cellSize, i * this.cellSize + this.cellSize);
                    ctx.lineTo(j * this.cellSize, i * this.cellSize + this.cellSize);
                    ctx.lineWidth = wallW;
                    ctx.stroke();
                }
            }
        }
    }

    // implementation of wilson's algo
    wilson_algo() {
        // array for the path in the
        // https://github.com/davidbau/seedrandom
        // ^ See for random seed implementation

        this.maze[0][0].inMaze = true;
        // for each cell in maze
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                // if cell is already in the maze move to the next one
                if (this.maze[i][j].inMaze == true) continue;
                // initialize path
                let path = [[i, j]];
                // pointer to last index
                let lastP = path[path.length - 1];
                // prev cell's row and col ([row, col])
                let prev = undefined;
                // set ceel to be in path
                this.maze[lastP[0]][lastP[1]].inPath = true;
                // while not in maze
                while (!this.maze[lastP[0]][lastP[1]].inMaze) {
                    // find a random path to maze
                    path.push(this.maze[lastP[0]][lastP[1]].nextNeighbor(prev, this.row, this.col));
                    lastP = path[path.length - 1];
                    // if loop in path
                    if (this.maze[lastP[0]][lastP[1]].inPath) {
                        //delete loop
                        let stopP = lastP;
                        do {
                            // remove last element in path
                            let rem = path.pop();
                            this.maze[rem[0]][rem[1]].inPath = false;
                            stopP = path[path.length - 1];
                        } while (!(lastP[0] == stopP[0] && lastP[1] == stopP[1]));
                    }
                    // set prev
                    if (path.length > 1)
                        prev = path[path.length - 2];
                    else
                        prev = undefined;
                    // adds the new last point to path
                    this.maze[lastP[0]][lastP[1]].inPath = true;
                }
                // add each cell of path to maze
                for (let x = path.length - 1; x > 0; x--) {
                    // sets curr and prev pointer
                    let curr = path[x];
                    prev = path[x - 1];
                    // sets curr and prev in maze
                    this.maze[curr[0]][curr[1]].inMaze = true;
                    this.maze[prev[0]][prev[1]].inMaze = true;
                    // removes curr and prev from path
                    this.maze[curr[0]][curr[1]].inPath = false;
                    this.maze[prev[0]][prev[1]].inPath = false;
                    // removes the correct walls from curr and prev
                    if (prev[0] < curr[0]) { /*prev above curr*/
                        this.maze[curr[0]][curr[1]].walls[1] = false;
                        this.maze[prev[0]][prev[1]].walls[3] = false;
                    } else if (prev[0] > curr[0]) { /*prev below curr*/
                        this.maze[curr[0]][curr[1]].walls[3] = false;
                        this.maze[prev[0]][prev[1]].walls[1] = false;
                    } else if (prev[1] < curr[1]) { /*prev left curr*/
                        this.maze[curr[0]][curr[1]].walls[0] = false;
                        this.maze[prev[0]][prev[1]].walls[2] = false;
                    } else {/*prev right curr*/
                        this.maze[curr[0]][curr[1]].walls[2] = false;
                        this.maze[prev[0]][prev[1]].walls[0] = false;
                    }
                }
            }
        }
    }

    // test
    test_algo() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                for (let w = 0; w < this.maze[i][j].walls.length; w++) {
                    this.maze[i][j].walls[w] = false;
                }
                if (i == 1 && j == 1) {
                    for (let w = 0; w < this.maze[i][j].walls.length; w++) {
                        this.maze[i][j].walls[w] = true;
                    }
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
        // if in maze
        this.inMaze = false;
        // used for loop deletion
        this.inPath = false;
        // if cell is goal
        // this.isGoal = false;
    }

    // returns a list of neighbors for this given cell ([row, col])
    // row and col are the size of the maze
    getNeighbors(row, col) {
        let neighbors = [];
        if (this.i - 1 >= 0) //up
            neighbors.push([this.i - 1, this.j]);
        if (this.j - 1 >= 0) //left
            neighbors.push([this.i, this.j - 1]);
        if (this.i + 1 < row) //down
            neighbors.push([this.i + 1, this.j]);
        if (this.j + 1 < col) //right
            neighbors.push([this.i, this.j + 1]);
        return neighbors;
    }

    // returns random next neighbor ([row, col])
    // input: previous Cell's ([row, col]), rows in maze, col in maze
    nextNeighbor(prev, row, col) {
        let neighbors = this.getNeighbors(row, col);


        //corners
        if (this.i - 1 < 0 && this.j - 1 < 0) { //top left
            if (prev === undefined) {
                let neighbors = [
                [this.i, this.j+1],
                [this.i+1, this.j]];
                let rand = Math.floor(Math.random() * 2); // 0 or 1
                return neighbors[rand];
            } else if (prev[0] > this.i) // prev below
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
            } else if (prev[0] > this.i) // prev below
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
            } else if (prev[0] < this.i) // prev above
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
            } else if (prev[0] < this.i) //prev above
                return [this.i, this.j + 1];
            else
                return [this.i - 1, this.j];
        // edges
        } else if (this.i - 1 < 0) { //top edge
            let neighbors = [
            [this.i, this.j-1], // left
            [this.i, this.j+1], // right
            [this.i+1, this.j]]; // below
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev[0] > this.i) // prev below
                return neighbors[rand]; // 0/1
            else if (prev[1] < this.j) // prev left
                return neighbors[rand + 1]; // 1/2
            else
                return neighbors[rand * 2]; // 0/2
        } else if (this.i + 1 >= row) {//bottom edge
            let neighbors = [
            [this.i, this.j-1], //left
            [this.i, this.j+1], //right
            [this.i-1, this.j]]; //up
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev[0] < this.i) // prev up
                return neighbors[rand]; // 0/1
            else if (prev[1] < this.j) // prev left
                return neighbors[rand + 1]; // 1/2
            else
                return neighbors[rand * 2]; // 0/2
        } else if (this.j - 1 < 0) {//left edge
            let neighbors = [
            [this.i, this.j+1], //right
            [this.i+1, this.j], //below
            [this.i-1, this.j]]; //up
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev[1] > this.j) //prev right
                return neighbors[rand + 1]; // 1/2
            else if (prev[0] > this.i) //prev below
                return neighbors[rand * 2]; // 0/2
            else
                return neighbors[rand]; // 0/1
        } else if (this.j + 1 >= col) {//right edge
            let neighbors = [
            [this.i, this.j-1], //left
            [this.i+1, this.j], //below
            [this.i-1, this.j]]; //up
            let rand = Math.floor(Math.random() * 2); // 0 or 1
            if (prev === undefined) {
                rand = Math.floor(Math.random() * 3); // 0 to 2
                return neighbors[rand];
            } else if (prev[1] < this.j) // prev left
                return neighbors[rand + 1]; // 1/2
            else if (prev[0] > this.i) // prev below
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
                rand = Math.floor(Math.random() * 4); // 0 to 3
                return neighbors[rand];
            } else if (prev[0] < this.i) { //prev up
                let neighbors = [
                [this.i, this.j-1],
                [this.i, this.j+1],
                [this.i+1, this.j]];
                return neighbors[rand];
            } else if (prev[1] < this.j) { //prev left
                let neighbors = [
                [this.i, this.j+1],
                [this.i+1, this.j],
                [this.i-1, this.j]];
                return neighbors[rand];
            } else if (prev[0] > this.i) { //prev below
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
