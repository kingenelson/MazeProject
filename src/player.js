export default class Player {
    constructor(game) {

        // this.gameWidth = game.gameSize.x;
        // this.gameHeight = game.gameSize.y;

        // how big the player is
        this.width = 7;
        this.height = 7;

        this.maze = game.level.maze;

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
        this.nextPosition = {
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
        ctx.fillRect(this.position.x, this.position.y,
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
        if (direction[37]) this.nextPosition.x = this.position.x - 1;
        else if (direction[38]) this.nextPosition.y = this.position.y - 1;
        else if (direction[39]) this.nextPosition.x = this.position.x + 1;
        else (direction[40]) this.nextPosition.y = this.position.y + 1;
    }

    update(deltaTime) {
        this.position.x = this.nextPosition.x;
        this.position.y = this.nextPosition.y;
        // want to move left and no left wall
        if (this.direction.left && !this.maze[this.position.y][this.position.x].walls[0]) {

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
