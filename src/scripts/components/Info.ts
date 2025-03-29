import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';
import { injectable } from 'tsyringe';

@injectable()
export class Info extends PIXI.Container {
    public name: string = 'GameInfo';
    protected _zIndex: number = 30;
    private positionX: number = 56;
    private positionY: number = 35;
    private infoWidth: number = 40;
    private infoHeight: number = 40;

    constructor() {
        super();

        this.init();
    }

    private init(): void {
        const button: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('INFO'));
        button.anchor.set(1, 0);
        button.width = this.infoWidth;
        button.height = this.infoHeight;
        button.x = this.positionX;
        button.y = this.positionY;

        button.eventMode = 'static';
        button.on('touchstart', () => { console.log('open instruction') });

        this.addChild(button);
    }
}