import Player from './player.js';
import InputHandler from './input.js';
import Level from './level.js';

// will have 3 gamestates (menu, game, gameover)

export default class Game {
    constructor(gameRow = 50, gameCol = 100) {
        this.gameSize = {
            row: gameRow,
            col: gameCol
        };
    }

    start(ctx) {
        this.level = new Level(this.gameSize.row, this.gameSize.col);
        this.level.draw(ctx);
        this.player = new Player(this);
        new InputHandler(this.player);
        return this.level.wilson_algo(ctx);

    }

    // TODO only draw cells that change
    draw(ctx) {
        this.level.draw(ctx);
        this.player.draw(ctx);
    }

    update(deltaTime) {
        this.player.update(deltaTime);
    }
}
