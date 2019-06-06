class Player {
    constructor(gameWidth, gameHeight) {
        // how big the player is
        this.width = 50;
        this.height = 50;
        // starting position of player
        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight / 2 - this.height / 2
        };
    }

    draw(ctx) {
        ctx.fillStyle = '#FF0000"';
        ctx.fillRect(this.position.x, this.position.y,
            this.width, this.height);
    }
}

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let player = new Player(GAME_WIDTH, GAME_HEIGHT);
player.draw(ctx);
