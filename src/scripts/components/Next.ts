import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';
import Texture from '../textures/Texture';


@singleton()
export class Next extends PIXI.Container {
    public name: string = 'NextElement';
    protected _zIndex: number = 20;
    private positionX: number = 65;
    private positionY: number = 67;
    private logoWidth: number = 60;
    private logoHeight: number = 50;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        const sprite: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('TRANSPARENT'));
        sprite.anchor.set(1, 0)
        sprite.width = this.logoWidth;
        sprite.height = this.logoHeight;
        sprite.x = this.positionX;
        sprite.y = this.positionY;

        this.addChild(sprite);
    }
}