import * as PIXI from 'pixi.js';
import Texture from '../textures/Texture';
import { BaseElement } from './baseComponents/BaseElement';
import { injectable, singleton } from 'tsyringe';


@injectable()
@singleton()
export class ButtonRotate extends PIXI.Container {
    public name: string = 'RotateButton';
    protected _zIndex: number = 30;
    private positionX: number = 234.5;
    private positionY: number = 728;
    private buttonWidth: number = 90;
    private buttonHeight: number = 65;
    private element: any = {};

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        const button: PIXI.Sprite = new PIXI.Sprite(Texture.getTexture('ROTATE'));
        button.anchor.set(0.5);
        button.width = this.buttonWidth;
        button.height = this.buttonHeight;
        button.x = this.positionX;
        button.y = this.positionY;

        button.eventMode = 'static';

        button.on('touchstart', () => {this.rotate()});
        this.addChild(button);
    }

    addElement(e: BaseElement): void {
        this.element = e;
    }

    rotate(): void {
    this.element.rotate();
    }
}