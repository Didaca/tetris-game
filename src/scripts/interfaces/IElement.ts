import * as PIXI from 'pixi.js';


export interface IElement {
    image: PIXI.Texture | undefined;
    draw(): void;
    down(): void;
    reDraw(): void;
    left(): void;
    right(): void;
    rotate(): void;

}