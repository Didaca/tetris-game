import * as PIXI from 'pixi.js';

import { t, tPNG } from '../../textures/textures';
import { BaseElement } from '../baseComponents/cBaseElement';
import { Numbers } from '../../enums/Numbers';
import { EPositions } from '../../enums/Positions';


export class T extends BaseElement {
    readonly type: string;
    readonly elementHeight: number;
    readonly elementLenght: number;
    readonly image: PIXI.Texture;
    readonly texture: PIXI.Texture;
    constructor() {
        super()
        this.texture = t;
        this.type = 't';
        this.image = tPNG;
        this.elementHeight = 2;
        this.elementLenght = 3;
        this.startPosition = 8;
    }

    draw(container: any): void {
        let row = this.lastRowContainerIndex;
        for (let r = Numbers.ZERO; r < this.elementHeight; r++) {
            container.children[row].children[this.startPosition].texture = this.texture;
            this.coordinates.push([row, this.startPosition]);
            if (r === this.elementHeight - Numbers.ONE) {
                container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture
                this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture
                this.coordinates.push([row, this.startPosition + Numbers.ONE]);
            }
            row++;
        }
    }

    updatePosition(): void {
        if (this.position === EPositions.POS0) { this.position = EPositions.POS90 }
        else if (this.position === EPositions.POS90) { this.position = EPositions.POS180 }
        else if (this.position === EPositions.POS180) { this.position = EPositions.POS270 }
        else if (this.position === EPositions.POS270) { this.position = EPositions.POS0 };
    }

    reDraw(container: any): void {
        let row = this.lastRowContainerIndex;
        const cnt = container;
        if (this.position === EPositions.POS0) {
            for (let r = 0; r < this.elementLenght; r++) {
                if (r === 0) {
                    container.children[row - Numbers.ONE].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition - Numbers.ONE]);
                } else if (r === 1) {
                    container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                } else {
                    container.children[row + Numbers.ONE].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row + Numbers.ONE, this.startPosition - Numbers.ONE]);
                }
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS90) {
            for (let r = Numbers.ZERO; r < this.elementHeight; r++) {
                container.children[row].children[this.startPosition].texture = this.texture;
                this.coordinates.push([row, this.startPosition]);
                if (r === Numbers.ZERO) {
                    container.children[row - Numbers.ONE].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition]);
                    container.children[row - Numbers.ONE].children[this.startPosition - Numbers.ONE].texture = this.texture
                    this.coordinates.push([row - Numbers.ONE, this.startPosition - Numbers.ONE]);
                    container.children[row - Numbers.ONE].children[this.startPosition + Numbers.ONE].texture = this.texture
                    this.coordinates.push([row - Numbers.ONE, this.startPosition + Numbers.ONE]);
                }
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS180) {
            for (let r = Numbers.ZERO; r < this.elementLenght; r++) {
                if (r === 0) {
                    container.children[row - Numbers.ONE].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition + Numbers.ONE]);
                } else if (r === 1) {
                    container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition + Numbers.ONE]);
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                } else {
                    container.children[row + Numbers.ONE].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row + Numbers.ONE, this.startPosition + Numbers.ONE]);
                }
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS270) {
            this.draw(cnt);
            this.updatePosition();
        }
    }

    verificateNewPosition(container: any): boolean {
        let empty: boolean = true;
        let row = this.lastRowContainerIndex;
        if (this.position === EPositions.POS0) {
            container.children[row - Numbers.ONE].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        } else if (this.position === EPositions.POS90) {
            container.children[row - Numbers.ONE].children[this.startPosition].texture !== this.baseTexture ? empty = false : null;
            container.children[row - Numbers.ONE].children[this.startPosition + Numbers.ONE].texture !== this.baseTexture ? empty = false : null
        } else if (this.position === EPositions.POS180) {
            container.children[row].children[this.startPosition + Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[this.startPosition + Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        } else if (this.position === EPositions.POS270) {
            container.children[row + Numbers.ONE].children[this.startPosition].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[this.startPosition - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        }
        return empty;
    }

}