export default class Player {
    constructor(game) {

        // this.gameWidth = game.gameSize.x;
        // this.gameHeight = game.gameSize.y;

        // how big the player is
        this.width = 9;
        this.height = 9;

        this.maze = game.level.maze;
        this.cellSize = game.level.cellSize;

        // speed of player
        // this.maxSpeed = {
        //     x: 4,
        //     y: 4
        // };
        // this.speed = {
        //     x: 0,
        //     y: 0
        // };

        // starting position of player
        this.position = {
            x: 0,
            y: 0
        };
        // this.nextPosition = {
        //     x: 0,
        //     y: 0
        // };
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
            this.width, this.height);
    }

    move(direction) {
        // direction is a bool array for which directions to move in
        // this.speed.x = 0;
        // this.speed.y = 0;
        //sets speed
        // if (direction[37]) this.speed.x += -this.maxSpeed.x;
        // if (direction[38]) this.speed.y += -this.maxSpeed.y;
        // if (direction[39]) this.speed.x += this.maxSpeed.x;
        // if (direction[40]) this.speed.y += this.maxSpeed.y;

        // if (direction[37]) this.nextPosition.x = this.position.x - 1;
        // else if (direction[38]) this.nextPosition.y = this.position.y - 1;
        // else if (direction[39]) this.nextPosition.x = this.position.x + 1;
        // else (direction[40]) this.nextPosition.y = this.position.y + 1;

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
        // this.position.x = this.nextPosition.x;
        // this.position.y = this.nextPosition.y;
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

        // game border collision detection
        // if (this.position.x < 1)
        //     this.position.x = 1;
        // if (this.position.y < 1)
        //     this.position.y = 1;
        // if (this.position.x > this.gameWidth - this.width - 1)
        //     this.position.x = this.gameWidth - this.width - 1;
        // if (this.position.y > this.gameHeight - this.height - 1)
        //     this.position.y = this.gameHeight - this.height;
    }
}
