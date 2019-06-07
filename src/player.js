"use strict";
export default class Player {
    constructor(game) {
        // how big the player is
        this.gameWidth = game.gameSize.x;
        this.gameHeight = game.gameSize.y;
        // console.log(this.gameWidth + " " + this.gameHeight);

        this.width = 20;
        this.height = 20;
        // speed of player
        this.maxSpeed = {
            x: 5,
            y: 5
        };
        this.speed = {
            x: 0,
            y: 0
        };

        // starting position of player
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight / 2 - this.height / 2
        };
    }

    draw(ctx) {
        // alert('drawing');
        ctx.fillStyle = '#FF0000"';
        ctx.fillRect(this.position.x, this.position.y,
            this.width, this.height);
        // console.log('test');
    }

    move(direction) {
        // direction is a bool array for which directions to move in
        this.speed.x = 0;
        this.speed.y = 0;
        //sets speed
        if (direction[37]) this.speed.x += -this.maxSpeed.x;
        if (direction[38]) this.speed.y += -this.maxSpeed.y;
        if (direction[39]) this.speed.x += this.maxSpeed.x;
        if (direction[40]) this.speed.y += this.maxSpeed.y;
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // game border collision detection
        if (this.position.x < 1) this.position.x = 1;
        if (this.position.y < 1) this.position.y = 1;
        if (this.position.x > this.gameWidth - this.width - 1) {
            this.position.x = this.gameWidth - this.width - 1;
        }
        if (this.position.y > this.gameHeight - this.height - 1) {
            this.position.y = this.gameHeight - this.height;
        }
    }
}
