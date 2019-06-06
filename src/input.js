export default class InputHandler {
    constructor(player) {
        let direction = {};
        document.addEventListener('keydown', (event) => {

            direction[event.keyCode] = true;
            player.move(direction);
        });
        document.addEventListener('keyup', (event) => {

            direction[event.keyCode] = false;
            // if (direction[37] && direction[38]
            //     && direction[39] && direction[40]) {
            //     player.stop()
            // }
            player.move(direction);
        });
    }
}
