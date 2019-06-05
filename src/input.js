export default class InputHandler {
    constructor(player) {
        direction = {};
        document.addEventListener('keydown', (event) => {
            alert(event.keyCode);
            direction[event.keyCode] = true;
            player.move(direction);
        });
        document.addEventListener('keyup', (event) => {
            alert(event.keyCode);
            direction[event.keyCode] = false;
            // if (direction[37] && direction[38]
            //     && direction[39] && direction[40]) {
            //     player.stop()
            // }
            player.move(direction);
        });
    }
}
