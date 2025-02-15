import * as PIXI from 'pixi.js';
import { IElement } from '../../interfaces/IElement';
import { Numbers } from '../../enums/Numbers';

export class BaseElement implements IElement {
    readonly elementHeight: number = 0;
    readonly elementLenght: number = 0;
    lastRowContainerIndex: number = 0;
    public image: PIXI.Texture | undefined;
    protected isDrawn: boolean = true;
    protected _position: string = '0';
    protected _texture: PIXI.Texture | undefined;
    protected _startPosition: number = 8;
    protected coordinates: number[] = [];


    draw(): void {}

    down(): void {}

    reDraw(): void {}

    protected setCoordinates(a: number, b: number): void {
        if(this.coordinates.length > 0) {
            this.coordinates.push(a, b);
            this.coordinates = this.coordinates.slice(2);
        } else {
            this.coordinates.push(a, b);
        }
    }

    protected cleanCoordinates(): void {
        this.coordinates = [];
    }

    protected setDownCoordinates(): void {
        this.coordinates[0] += 1;
    }

    protected setLeftCoordinates(): void {
        this.coordinates[1] -= 1;
    }

    protected setRightCoordinates(): void {
        this.coordinates[1] += 1;
    }

}