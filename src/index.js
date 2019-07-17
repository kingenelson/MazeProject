import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
// console.log(ctx);

let game = new Game();
let startUpFrames = game.start(ctx);
console.log(startUpFrames.length);
let lastTime = 0;
let count = 0;
function gameStartUpLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;



    requestAnimationFrame(gameStartUpLoop);
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (startUpFrames.length < 1) {
        game.update(deltaTime);
        game.draw(ctx);
    } else {
        if (count < 1) {
            ctx.drawImage(startUpFrames[0].canvas, 0, 0);
            count++;
        } else {
            count = 0;
            startUpFrames = startUpFrames.splice(1);
            ctx.drawImage(startUpFrames[0].canvas, 0, 0);
        }
    }

    requestAnimationFrame(gameLoop);
}

// requestAnimationFrame(gameStartUpLoop);
lastTime = 0;
requestAnimationFrame(gameLoop);
