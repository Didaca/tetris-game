import * as PIXI from 'pixi.js';

import { piller, pillerPNG } from '../../textures/textures';
import { BaseElement } from '../baseComponents/cBaseElement';
import { Numbers } from '../../enums/Numbers';
import { EPositions } from '../../enums/Positions';


export class Piller extends BaseElement {
    readonly type: string;
    readonly image: PIXI.Texture;
    readonly texture: PIXI.Texture;
    readonly elementHeight: number;
    readonly elementLenght: number;
    constructor() {
        super()
        this.texture = piller;
        this.type  = 'piller';
        this.image  = pillerPNG;
        this.elementHeight = 4;
        this.elementLenght = 1;
    }

    draw(container: any): void {
        let row = this.lastRowContainerIndex;
        for (let r = 0; r < this.elementHeight; r++) {
            container.children[row].children[this.startPosition].texture = this.texture;
            this.coordinates.push([row, this.startPosition]);
            row++;
        }
    }
    updatePosition(): void {
        if (this.position === EPositions.POS0) { this.position = EPositions.POS90 }
        else if (this.position === EPositions.POS90) { this.position = EPositions.POS0 };
    }

    reDraw(container: any): void {
        const row: number = this.lastRowContainerIndex;
        const col: number = this.startPosition;
        const matrixColumns = container.matrixCol;
        if (this.position === EPositions.POS0 && col > 0 && col < matrixColumns - Numbers.TWO) {
            for (let r = 0; r < this.elementHeight; r++) {
                if (r === 0) {
                    container.children[row].children[col - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, col - Numbers.ONE]);
                } else {
                    container.children[row].children[col + r - Numbers.ONE].texture = this.texture;
                    this.coordinates.push([row, col + r - Numbers.ONE]);
                }
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS0 && col === 0) {
            for (let r = 0; r < this.elementHeight; r++) {
                container.children[row].children[col + r].texture = this.texture;
                this.coordinates.push([row, col + r]);
            }
            this.updatePosition();
        } else if (this.position === EPositions.POS0 && col >= matrixColumns - Numbers.TWO) {
            for (let r = 0; r < this.elementHeight; r++) {
                container.children[row].children[col - r].texture = this.texture;
                this.coordinates.push([row, col - r]);
            }
            this.updatePosition();
        } else {
            this.draw(container);
            this.updatePosition();
        }
    }

    verificateNewPosition(container: any): boolean {
        let empty: boolean = true;
        const row: number = this.lastRowContainerIndex;
        const col: number = this.startPosition;
        const matrixColumns = container.matrixCol;
        const matrixRow = container.matrixRow;
        if (this.position === EPositions.POS0 && col > 0 && col < matrixColumns - Numbers.TWO) {
            for (let r = 0; r < this.elementHeight - Numbers.ONE; r++) {
                if (r === 0) {
                    container.children[row].children[col - Numbers.ONE].texture !== this.baseTexture ? empty = false : null;
                } else {
                    container.children[row].children[col + r].texture !== this.baseTexture ? empty = false : null;
                }
            }
        } else if (this.position === EPositions.POS0 && col === 0) {
            for (let r = 1; r < this.elementHeight; r++) {
                container.children[row].children[col + r].texture !== this.baseTexture ? empty = false : null;
            }
        } else if (this.position === EPositions.POS0 && col >= matrixColumns - Numbers.TWO) {
            for (let r = 1; r < this.elementHeight; r++) {
                container.children[row].children[col - r].texture !== this.baseTexture ? empty = false : null;
            }
        } else if (this.position !== EPositions.POS0 && row <= matrixRow - this.elementHeight) {
            for (let r = 1; r < this.elementHeight; r++) {
                container.children[row + r].children[col].texture !== this.baseTexture ? empty = false : null;
            }
        }

        this.position !== EPositions.POS0 && row > matrixRow - this.elementHeight ? empty = false : null;

        return empty;
    }

}
