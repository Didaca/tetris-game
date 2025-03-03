import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';
import Texture from '../../textures/Texture';


@singleton()
export class NextText extends PIXI.Container {
    public name: string = 'Next';
    protected _zIndex: number = 20;
    private positionX: number = 50;
    private positionY: number = 117;
    private logoWidth: number = 30;
    private logoHeight: number = 80;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        const sprite: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('NEXT'));
        sprite.anchor.set(1, 0)
        sprite.width = this.logoWidth;
        sprite.height = this.logoHeight;
        sprite.x = this.positionX;
        sprite.y = this.positionY;

        this.addChild(sprite);
    }
}