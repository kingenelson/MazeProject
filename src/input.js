export default class InputHandler {
    constructor(player) {
        let direction = {};
        let fired = false;
        document.addEventListener('keydown', (event) => {
            if (!fired) {
                fired = true;
                direction[event.keyCode] = true;
                // console.log('fired!');
                player.move(direction);
                direction[event.keyCode] = false;
            }
        });
        document.addEventListener('keyup', (event) => {
            fired = false;

            // direction[event.keyCode] = false;
            // player.move(direction);
        });
    }
}
