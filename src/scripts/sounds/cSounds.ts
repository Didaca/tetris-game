// import { sound } from '@pixi/sound';
const { Howl } = require('howler');

export class Sounds {
    private sound: any;
    constructor() {
        // with PIXI.sound
        // sound.add({
        //     fullLine: 'resources/Sounds/full_line.wav',
        //     gameOver: 'resources/Sounds/game_over.wav',
        //     rotation: 'resources/Sounds/rotation.wav'
        // });

        // with howler
        this.sound = {
            fullLine: new Howl({
                src: ['resources/Sounds/full_line.wav'],
            }),
            rotation: new Howl({
                src: ['resources/Sounds/rotation.wav'],
            }),
            gameOver: new Howl({
                src: ['resources/Sounds/game_over.wav'],
            })
        }
    }

    public play(key: string): void {
        // with PIXI.sound
        // sound.play(key);
        this.sound[key].play();
    }

}