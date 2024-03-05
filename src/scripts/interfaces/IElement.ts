import * as PIXI from 'pixi.js';

export interface IElement {
    type: string;
    elementHeight: number;
    elementLenght: number;
    lastRowContainerIndex: number;
    baseTexture: PIXI.Texture;

}