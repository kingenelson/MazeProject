import Player from './player.js';
import InputHandler from './input.js';
"use strict";

// will have 3 gamestates (menu, game, gameover)

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameSize = {
            x: gameWidth,
            y: gameHeight
        };

        // console.log(this.gameSize.x + " " + this.gameSize.y);

        this.player = new Player(this);

        new InputHandler(this.player);
    }

    draw(ctx) {
        this.player.draw(ctx);
        // console.log('test');
    }

    update(deltaTime) {
        this.player.update(deltaTime);
    }
}
