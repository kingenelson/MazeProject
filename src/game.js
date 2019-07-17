import Player from './player.js';
import InputHandler from './input.js';
import Level from './level.js';

// will have 3 gamestates (menu, game, gameover)

export default class Game {
    constructor() {
        this.gameSize = {
            x: 1,
            y: 2
        };
    }

    start(ctx) {
        this.level = new Level(10, 20);
        this.level.draw(ctx);
        this.player = new Player(this);
        new InputHandler(this.player);
        return this.level.wilson_algo(ctx);

    }

    draw(ctx) {
        this.level.draw(ctx);
        this.player.draw(ctx);
    }

    update(deltaTime) {
        // console.log(deltaTime);
        this.player.update(deltaTime);
    }
}
