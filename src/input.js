export default class InputHandler {
    constructor(player) {
        let direction = {};
        document.addEventListener('keydown', (event) => {

            direction[event.keyCode] = true;
            player.move(direction);
            direction[event.keyCode] = false;
        });
        // document.addEventListener('keyup', (event) => {

        //     direction[event.keyCode] = false;
        //     player.move(direction);
        // });
    }
}
