import Player from './player.js';
import InputHandler from './input.js';
import Level from './level.js';

// will have 3 gamestates (menu, game, gameover)

export default class Game {
    constructor(gameRow = 5, gameCol = 10) {
        this.gameSize = {
            row: gameRow,
            col: gameCol
        };
        this.gameOver = false;
    }

    start(ctx) {
        this.level = new Level(this.gameSize.row, this.gameSize.col);
        this.player = new Player(this);
        this.level.draw(ctx);
        new InputHandler(this.player);
        return this.level.wilson_algo(ctx);

    }

    // TODO only draw cells that change
    draw(ctx) {
        this.level.draw(ctx);
        this.player.draw(ctx);
    }

    update(deltaTime) {
        // console.log(this.player);
        if (this.level.maze[this.player.position.y][this.player.position.x].isGoal)
            this.gameOver = true;
        else
            this.player.update(deltaTime);
    }
}
