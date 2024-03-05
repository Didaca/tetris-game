/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cSounds.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  13.02.24 10:45 am.
 * Last modified: 13.02.24 10:45 am.
 * 
 * More information at: https://egt-digital.com/
 */
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