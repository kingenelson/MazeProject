export default class Player {
    constructor(gameWidth, gameHeight) {
        // how big the player is
        this.width = 50;
        this.height = 50;
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
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight / 2 - this.height / 2
        };
    }

    draw(ctx) {
        // alert('drawing');
        ctx.fillStyle = '#FF0000"';
        ctx.fillRect(this.position.x, this.position.y,
            this.width, this.height);
    }

    move(direction) {
        // direction is a bool array for which directions to move in
        this.speed.x = 0;
        this.speed.y = 0;
        if (direction[37]) this.speed.x += -this.maxSpeed.x;
        if (direction[38]) this.speed.y += -this.maxSpeed.y;
        if (direction[39]) this.speed.x += this.maxSpeed.x;
        if (direction[40]) this.speed.y += this.maxSpeed.y;
    }

    update(deltaTime) {
        if (!deltaTime) return;
        this.position.x += this.speed;
        this.position.y += this.speed;
    }
}
