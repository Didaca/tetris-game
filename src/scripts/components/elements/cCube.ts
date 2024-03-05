import * as PIXI from 'pixi.js';

import { cube, cubePNG } from '../../textures/textures';
import { BaseElement } from '../baseComponents/cBaseElement';
import { Numbers } from '../../enums/Numbers';


export class Cube extends BaseElement {
    readonly type: string;
    readonly image: PIXI.Texture;
    readonly texture: PIXI.Texture;
    readonly elementHeight: number;
    readonly elementLenght: number;

    constructor() {
        super()
        this.texture = cube;
        this.type = 'cube';
        this.image = cubePNG;
        this.elementHeight = 2;
        this.elementLenght = this.elementHeight;
        this.coordinates = [];
    }

    draw(container: any): void {
        for (let row = Numbers.ZERO; row < this.elementHeight; row++) {
            container.children[row].children[this.startPosition].texture = this.texture;
            container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
            this.coordinates.push([row, this.startPosition]);
            this.coordinates.push([row, this.startPosition + Numbers.ONE]);
        }
    }

}