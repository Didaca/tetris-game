import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';
import { injectable } from 'tsyringe';

@injectable()
export class Level extends PIXI.Container {
    public name: string = 'GameLevel';
    protected _zIndex: number = 30;
    private positionX: number = 416;
    private positionY: number = 45;
    private infoWidth: number = 30;
    private infoHeight: number = 30;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        const button: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('LEVEL'));
        button.width = this.infoWidth;
        button.height = this.infoHeight;
        button.x = this.positionX;
        button.y = this.positionY;

        button.eventMode = 'static';
        button.on('touchstart', () => { console.log('level UP!') });

        this.addChild(button);
    }
}