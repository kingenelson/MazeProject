let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

// ctx.fillStyle('#00f');
// ctx.fillRect(20, 20, 100, 100);
let player = new Player(GAME_WIDTH, GAME_HEIGHT);

player.draw(ctx)
