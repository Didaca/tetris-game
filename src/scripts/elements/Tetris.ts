import * as PIXI from 'pixi.js';

export class TetrisTXT {
    private tetrisElementWidth: number = 240; // 
    private tetrisElementHeight: number = 160; // 
    private tetrisElementX: number = 290; // 
    private tetrisElementY: number = 60; // 
    public element: PIXI.Sprite;

    constructor(texture: PIXI.Texture) {
        this.element = new PIXI.Sprite(texture);
        this.element.anchor.set(0.5);
        this.element.width = this.tetrisElementWidth;
        this.element.height = this.tetrisElementHeight;
        this.element.x = this.tetrisElementX;
        this.element.y = this.tetrisElementY;
    }
}