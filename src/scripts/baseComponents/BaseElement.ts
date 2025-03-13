import * as PIXI from 'pixi.js';
import { IElement } from '../interfaces/IElement';
import { injectable } from 'tsyringe';
import { BaseElementConfiguration } from './BaseElementConfiguration';


injectable()
export class BaseElement extends BaseElementConfiguration implements IElement {
    public image: PIXI.Texture | undefined;
    protected _texture: PIXI.Texture | undefined;
    protected coordinates: number[] = [];


    public draw(): void {};

    public down(): void {};

    public reDraw(): void {};

    public left(): void {};

    public right(): void {};

    public rotate(): void {};

    protected setCoordinates(a: number, b: number): void {
        if(this.coordinates.length > 0) {
            this.coordinates.push(a, b);
            this.coordinates = this.coordinates.slice(2);
        } else {
            this.coordinates.push(a, b);
        }
    };

    protected cleanCoordinates(): void {
        this.coordinates = [];
    };

    protected setUpCoordinates(): void {
        this.coordinates[0] -= 1;
    };

    protected setDownCoordinates(): void {
        this.coordinates[0] += 1;
    };

    protected setLeftCoordinates(): void {
        this.coordinates[1] -= 1;
    };

    protected setRightCoordinates(): void {
        this.coordinates[1] += 1;
    };

}