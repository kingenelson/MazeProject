export default class Level {
    constructor(row, col) {
        // TODO handle bad input
        this.row = row;
        this.col = col;
        // Size of the cells for drawing
        this.cellSize = 15;
        this.maze = [];
        for (let i = 0; i < this.row; i++) {
            this.maze[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.maze[i][j] = new Cell(i, j);
            }
        }
    }

    draw(ctx) {
        if (typeof ctx === 'undefined') return;
        // sets canvas to fit # of cells
        ctx.canvas.width = (this.col * this.cellSize);
        ctx.canvas.height = (this.row * this.cellSize);
        // width of the walls
        let wallW = 1;//Math.floor(this.cellSize / 4);

        // draws the cells onto the canvas
        // TODO use drawCell()
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (this.maze[0][0].walls[2] && this.maze[0][0].walls[3]) {
                    ctx.fillStyle = '#000';
                } else {
                    ctx.fillStyle = '#add8e6';
                }
                // console.log(ctx.fillStyle);
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

    drawCell(ctx, row, col) {
        // console.log('called');
        let wallW = 1;
        // type of cell
        if (this.maze[row][col].inMaze) { // In maze
            ctx.fillStyle = '#add8e6';
            ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        } else if (this.maze[row][col].inPath) { // In path
            ctx.fillStyle = '#90EE90';
            ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        } else { // in neither
            ctx.fillStyle = '#000';
            ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        }

        ctx.fillStyle = '#FFFFFF';
        if (this.maze[row][col].walls[0]) {// left wall
            ctx.beginPath();
            ctx.moveTo(col * this.cellSize, row * this.cellSize);
            ctx.lineTo(col * this.cellSize, row * this.cellSize + this.cellSize);
            ctx.lineWidth = wallW;
            ctx.stroke();
        }
        if (this.maze[row][col].walls[1]) {// top wall
            ctx.beginPath();
            ctx.moveTo(col * this.cellSize, row * this.cellSize);
            ctx.lineTo(col * this.cellSize + this.cellSize, row * this.cellSize);
            ctx.lineWidth = wallW;
            ctx.stroke();
        }
        if (this.maze[row][col].walls[2]) {// right wall
            ctx.beginPath();
            ctx.moveTo(col * this.cellSize + this.cellSize, row * this.cellSize + this.cellSize);
            ctx.lineTo(col * this.cellSize + this.cellSize, row * this.cellSize);
            ctx.lineWidth = wallW;
            ctx.stroke();
        }
        if (this.maze[row][col].walls[3]) {// bottom wall
            ctx.beginPath();
            ctx.moveTo(col * this.cellSize + this.cellSize, row * this.cellSize + this.cellSize);
            ctx.lineTo(col * this.cellSize, row * this.cellSize + this.cellSize);
            ctx.lineWidth = wallW;
            ctx.stroke();
        }
    }

    animateAlgo(ctx, row, col, ctxList = []) {
        let canvasFrame = document.createElement('canvas');
        canvasFrame.width = ctx.canvas.width;
        canvasFrame.height = ctx.canvas.height;
        // console.log(canvasFrame);
        let newctx = canvasFrame.getContext('2d');
        // console.log(newctx);
        if (ctxList.length < 1)
            newctx.drawImage(ctx.canvas, 0, 0);
        else
            newctx.drawImage(ctxList[ctxList.length - 1].canvas, 0, 0);
        this.drawCell(newctx, row, col);
        ctxList.push(newctx);
        return ctxList;
    }

    // implementation of wilson's algo
    wilson_algo(ctx) {
        // https://github.com/davidbau/seedrandom
        // ^ See for random seed implementation
        let toDraw = typeof ctx !== 'undefined';
        let canvasList;
        this.maze[0][0].inMaze = true;
        if (toDraw) canvasList = this.animateAlgo(ctx, 0, 0);
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
                // set cell to be in path
                this.maze[lastP[0]][lastP[1]].inPath = true;
                if (toDraw) this.animateAlgo(ctx, lastP[0], lastP[1], canvasList);
                // while not in maze
                while (!this.maze[lastP[0]][lastP[1]].inMaze) {
                    // find a random path to maze
                    path.push(this.maze[lastP[0]][lastP[1]].nextNeighbor(prev, this.row, this.col));
                    lastP = path[path.length - 1];
                    if (toDraw) this.animateAlgo(ctx, lastP[0], lastP[1], canvasList);
                    // if loop in path
                    if (this.maze[lastP[0]][lastP[1]].inPath) {
                        //delete loop
                        let stopP = lastP;
                        do {
                            // remove last element in path
                            let rem = path.pop();
                            this.maze[rem[0]][rem[1]].inPath = false;
                            stopP = path[path.length - 1];
                            if (toDraw) this.animateAlgo(ctx, rem[0], rem[1], canvasList);
                        } while (!(lastP[0] == stopP[0] && lastP[1] == stopP[1]));
                    }
                    // set prev
                    if (path.length > 1)
                        prev = path[path.length - 2];
                    else
                        prev = undefined;
                    // adds the new last point to path
                    this.maze[lastP[0]][lastP[1]].inPath = true;
                    if (toDraw) this.animateAlgo(ctx, lastP[0], lastP[1], canvasList);
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
                    if (toDraw) this.animateAlgo(ctx, curr[0], curr[1], canvasList);
                    if (toDraw) this.animateAlgo(ctx, prev[0], prev[1], canvasList);
                }
            }
        }
        return canvasList;
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
        // this.visted = false;
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
    // TODO see https://www.youtube.com/watch?v=D8UgRyRnvXU for fix
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
