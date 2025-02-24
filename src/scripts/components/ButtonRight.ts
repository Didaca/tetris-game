import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';
import { BaseElement } from './baseComponents/BaseElement';
import { singleton } from 'tsyringe';


@singleton()
export class ButtonRight extends PIXI.Container {
    public name: string = 'LeftButton';
    protected _zIndex: number = 30;
    private positionX: number = 339;
    private positionY: number = 700;
    private buttonWidth: number = 70;
    private buttonHeight: number = 60;
    private element: any = {};

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        const button: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('B_RIGHT'));
        button.width = this.buttonWidth;
        button.height = this.buttonHeight;
        button.x = this.positionX;
        button.y = this.positionY;

        button.eventMode = 'static';

        button.on('touchstart', () => { this.toRight() });
        this.addChild(button);
    }

    addElement(e: BaseElement): void {
        this.element = e;
    }

    toRight(): void {
        this.element.right();
    }
}