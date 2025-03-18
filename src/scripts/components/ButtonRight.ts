import * as PIXI from 'pixi.js';
import { BaseElement } from '../baseComponents/BaseElement';
import { container, singleton } from 'tsyringe';
import { Right } from '../text/TextRight';


@singleton()
export class ButtonRight extends PIXI.Container {
    public name: string = 'RightButton';
    protected _zIndex: number = 30;
    private positionX: number = 319;
    private positionY: number = 700;
    private buttonWidth: number = 100;
    private buttonHeight: number = 60;
    private element: any = {};

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        const button: PIXI.Graphics = new PIXI.Graphics();
        button.beginFill();
        button.drawRect(this.positionX, this.positionY, this.buttonWidth, this.buttonHeight);
        button.alpha = 0;
        button.endFill();

        button.eventMode = 'static';
        button.on('touchstart', () => { this.toRight() });

        this.addChild(container.resolve(Right).text);
        this.addChild(button);
    }

    addElement(e: BaseElement): void {
        this.element = e;
    }

    toRight(): void {
        this.element.right();
    }
}