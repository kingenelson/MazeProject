import Player from './player.js';
import InputHandler from './input.js';
import Level from './level.js';

// will have 3 gamestates (menu, game, gameover)

export default class Game {
    constructor() {
        this.gameSize = {
            x: 0,
            y: 0
        };
    }

    start() {
        this.level = new Level(50, 75);
        this.level.wilson_algo();
        this.player = new Player(this);
        new InputHandler(this.player);

    }

    draw(ctx) {
        this.level.draw(ctx);
        this.player.draw(ctx);
    }

    update(deltaTime) {
        this.player.update(deltaTime);
    }

    // collisionDetection(player, level) {
    //     // game border collision detection
    //     if (player.position.x < 2)
    //         player.position.x = 2;
    //     if (player.position.y < 2)
    //         player.position.y = 2;
    //     if (player.position.x + player.width >  - 2)
    //         player.position.x = this.gameWidth - this.width - 1;
    //     if (player.position.y + player.height > this.gameHeight - 2)
    //         player.position.y = this.gameHeight - this.height;
    // }
}
