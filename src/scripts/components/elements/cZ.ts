import * as PIXI from 'pixi.js';

import { z, zPNG } from '../../textures/textures';
import { BaseElement } from '../baseComponents/cBaseElement';
import { Numbers } from '../../enums/Numbers';
import { EPositions } from '../../enums/Positions';

export class Z extends BaseElement {
    readonly type: string;
    readonly image: PIXI.Texture;
    readonly texture: PIXI.Texture;
    readonly elementHeight: number;
    readonly elementLenght: number;
    constructor() {
        super()
        this.texture = z;
        this.type = 'z';
        this.image = zPNG;
        this.elementHeight = 2;
        this.elementLenght = 3;
        this.startPosition = 8;
    }

    draw(container: any): void {
        let row = this.lastRowContainerIndex;
        for (let r = Numbers.ZERO; r < this.elementHeight; r++) {
            container.children[row].children[this.startPosition].texture = this.texture;
            this.coordinates.push([row, this.startPosition]);
            if (r === Numbers.ZERO) {
                container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                this.coordinates.push([row, this.startPosition + Numbers.ONE]);
            }
            if (r === this.elementHeight - Numbers.ONE) {
                container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                this.coordinates.push([row, this.startPosition - Numbers.ONE]);
            }
            row++;
        }
    }

    updatePosition(): void {
        if (this.position === EPositions.POS0) { this.position = EPositions.POS90 }
        else if (this.position === EPositions.POS90) { this.position = EPositions.POS0 };
    }

    reDraw(container: any): void {
        const row = this.lastRowContainerIndex;
        const cnt = container;
        if (this.position === EPositions.POS0) {
            for (let r = 0; r < this.elementHeight; r++) {
                if (r === 0) {
                    container.children[row - Numbers.ONE].children[this.startPosition - 1].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition - Numbers.ONE]);
                    container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                } else {
                    container.children[row + Numbers.ONE].children[this.startPosition + r - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row + Numbers.ONE, this.startPosition + r - Numbers.ONE]);
                }
            }
            this.updatePosition();
        } else {
            this.draw(cnt);
            this.updatePosition();
        }
    }

    verificateNewPosition(container: any): boolean {
        let empty: boolean = true;
        const row = this.lastRowContainerIndex;
        const cnt = container;
        if (this.position === EPositions.POS0) {
            container.children[row].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row - Numbers.ONE].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        } else {
            container.children[row].children[this.startPosition + Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        }
        return empty;
    }

}