import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';


export class Logo extends PIXI.Container {
    public name: string = 'GameLogo';
    protected _zIndex: number = 10;
    private positionX: number = 234.5;
    private logoWidth: number = 255;
    private logoHeight: number = 100;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        const sprite: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('LOGO'));
        sprite.anchor.set(0.5);
        sprite.width = this.logoWidth;
        sprite.height = this.logoHeight;
        sprite.x = this.positionX;
        sprite.y = sprite.height / 2;
        this.addChild(sprite);
    }
}