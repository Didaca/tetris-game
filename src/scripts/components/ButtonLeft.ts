import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';
import { BaseElement } from './baseComponents/BaseElement';
import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class ButtonLeft extends PIXI.Container {
    public name: string = 'LeftButton';
    protected _zIndex: number = 30;
    private positionX: number = 50;
    private positionY: number = 700;
    private buttonWidth: number = 90;
    private buttonHeight: number = 65;
    private element: any = {};

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        const button: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('B_LEFT'));
        button.width = this.buttonWidth;
        button.height = this.buttonHeight;
        button.x = this.positionX;
        button.y = this.positionY;

        button.eventMode = 'static';

        button.on('touchstart', () => { this.toLeft() });
        this.addChild(button);
    }

    addElement(e: BaseElement): void {
        this.element = e;
    }

    toLeft(): void {
        this.element.left();
    }
}