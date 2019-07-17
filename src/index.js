import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
// console.log(ctx);



function script() {
    let row = document.getElementById("row").value;
    let col = document.getElementById("col").value;
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("gameScreen").style.display = "inline";
    let game = new Game(row, col);
    let startUpFrames = game.start();
    // console.log(startUpFrames.length);
    let lastTime = 0;
    let count = 0;

    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        if (typeof startUpFrames === 'undefined' || startUpFrames.length < 1) {
            game.update(deltaTime);
            game.draw(ctx);
        } else {
            if (count < 1) {
                ctx.drawImage(startUpFrames[0].canvas, 0, 0);
                count++;
            } else {
                count = 0;
                startUpFrames = startUpFrames.splice(1);
            }
        }

        requestAnimationFrame(gameLoop);
    }

    lastTime = 0;
    requestAnimationFrame(gameLoop);
}

document.getElementById("submit").addEventListener("click", script);
