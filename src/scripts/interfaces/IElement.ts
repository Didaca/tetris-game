import * as PIXI from 'pixi.js';


export interface IElement {
    elementHeight: number;
    elementLenght: number;
    image: PIXI.Texture | undefined;

    draw(): void;
    down(): void;
    reDraw(): void;
    left(): void;
    right(): void;
    rotate(): void;

}