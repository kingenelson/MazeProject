export default class Player {
    constructor(game) {
        // how big the player is
        this.playerSize = 9;

        this.maze = game.level.maze;
        this.cellSize = game.level.cellSize;

        // starting position of player
        this.position = {
            x: 0,
            y: 0
        };

        this.direction = {
            left: false,
            up: false,
            right: false,
            down: false
        };
    }

    draw(ctx) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x * this.cellSize + 3,
            this.position.y * this.cellSize + 3,
            this.playerSize, this.playerSize);
    }

    move(direction) {
        // direction is a bool array for which directions to move in

        this.direction.left = false;
        this.direction.up = false;
        this.direction.right = false;
        this.direction.down = false;

        if (direction[37]) {
            this.direction.left = true;
        } else if (direction[38]) {
            this.direction.up = true;
        } else if (direction[39]) {
            this.direction.right = true;
        } else if (direction[40]) {
            this.direction.down = true;
        }
    }

    update(deltaTime) {
        // want to move left and no left wall
        if (this.direction.left && !this.maze[this.position.y][this.position.x].walls[0]) {
            this.position.x--;
            this.direction.left = false;
        } else if (this.direction.up && !this.maze[this.position.y][this.position.x].walls[1]) {
            this.position.y--;
            this.direction.up = false;
        } else if (this.direction.right && !this.maze[this.position.y][this.position.x].walls[2]) {
            this.position.x++;
            this.direction.right = false;
        } else if (this.direction.down && !this.maze[this.position.y][this.position.x].walls[3]) {
            this.position.y++;
            this.direction.down = false;
        }
    }
}
