import * as PIXI from 'pixi.js';

import { stick, stickPNG } from '../../textures/textures';
import { BaseElement } from '../baseComponents/cBaseElement';
import { Numbers } from '../../enums/Numbers';
import { EPositions } from '../../enums/Positions';


export class Stick extends BaseElement {
    readonly type: string;
    readonly image: PIXI.Texture;
    readonly texture: PIXI.Texture;
    readonly elementHeight: number;
    readonly elementLenght: number;

    constructor() {
        super()
        this.texture = stick;
        this.type = 'stick';
        this.image = stickPNG;
        this.elementHeight = 3;
        this.elementLenght = 2;
    }

    draw(container: any): void {
        let row = this.lastRowContainerIndex;
        for (let r = Numbers.ZERO; r < this.elementHeight; r++) {
            container.children[row].children[this.startPosition].texture = this.texture;
            this.coordinates.push([row, this.startPosition]);
            if (r === this.elementHeight - Numbers.ONE) {
                container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                this.coordinates.push([row, this.startPosition + Numbers.ONE]);
            }
            row++;
        }

        this.lastRowContainerIndex++;
    }

    updatePosition(): void {
        if (this.position === EPositions.POS0) { this.position = EPositions.POS90 }
        else if (this.position === EPositions.POS90) { this.position = EPositions.POS180 }
        else if (this.position === EPositions.POS180) { this.position = EPositions.POS270 }
        else if (this.position === EPositions.POS270) { this.position = EPositions.POS0 };
    }

    reDraw(container: any): void {
        let row = this.lastRowContainerIndex;
        if (this.position === EPositions.POS0) {
            for (let r = 0; r < this.elementLenght; r++) {
                if (r === 0) {
                    container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                    container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition + Numbers.ONE]);
                } else {
                    container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                }
                row++;
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS90) {
            for (let r = 0; r < this.elementLenght; r++) {
                if (r === 0) {
                    container.children[row - Numbers.ONE].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition - Numbers.ONE]);
                    container.children[row - Numbers.ONE].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row - Numbers.ONE, this.startPosition]);
                } else {
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                    container.children[row + Numbers.ONE].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row + Numbers.ONE, this.startPosition]);
                }
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS180) {
            for (let r = 0; r < this.elementLenght; r++) {
                if (r === 0) {
                    container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition + Numbers.ONE]);
                    container.children[row].children[this.startPosition].texture = this.texture;
                    this.coordinates.push([row, this.startPosition]);
                    container.children[row].children[this.startPosition - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition - Numbers.ONE]);
                } else {
                    container.children[row].children[this.startPosition + Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, this.startPosition + Numbers.ONE]);
                }
                row -= Numbers.ONE;
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS270) {
            this.lastRowContainerIndex -= Numbers.ONE;
            this.draw(container);
            this.updatePosition();
        }
    }


    verificateNewPosition(container: any): boolean {
        let empty: boolean = true;
        const row: number = this.lastRowContainerIndex;
        const col: number = this.startPosition;
        if (this.position === EPositions.POS0) {
            container.children[row].children[col - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row].children[col + Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[col - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
        } else if (this.position === EPositions.POS90) {
            container.children[row - Numbers.ONE].children[col - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
            container.children[row - Numbers.ONE].children[col].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[col].texture !== this.baseTexture ? empty = false : null;
        } else if (this.position === EPositions.POS180) {
            container.children[row].children[col + Numbers.ONE].texture === this.texture ? empty = false : null;
            container.children[row].children[col - Numbers.ONE].texture === this.texture ? empty = false : null;
            container.children[row - Numbers.ONE].children[col + Numbers.ONE].texture === this.texture ? empty = false : null;
        } else if (this.position === EPositions.POS270) {
            container.children[row - Numbers.ONE].children[col].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[col].texture !== this.baseTexture ? empty = false : null;
            container.children[row + Numbers.ONE].children[col + Numbers.ONE].texture === this.texture ? empty = false : null;
        }
        return empty;
    }
}
