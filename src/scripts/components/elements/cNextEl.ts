import * as PIXI from 'pixi.js';

export class NextElement {
    private nextElementWidth: number = 120; // 120
    private nextElementHeight: number = 120; // 120
    private nextElementX: number = 475; // 502
    private nextElementY: number = 240; // 240
    public element: PIXI.Sprite;

    constructor(texture: PIXI.Texture) {
        this.element = new PIXI.Sprite(texture);
        this.element.anchor.set(0.5);
        this.element.width = this.nextElementWidth;
        this.element.height = this.nextElementHeight;
        this.element.x = this.nextElementX;
        this.element.y = this.nextElementY;
    }

    public updateTexture(newTexture: PIXI.Texture): void {
        this.element.texture = newTexture;
    }
}