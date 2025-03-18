import * as PIXI from 'pixi.js';
import { BaseElement } from '../baseComponents/BaseElement';
import { container, singleton } from 'tsyringe';
import { Left } from '../text/TextLeft';


@singleton()
export class ButtonLeft extends PIXI.Container {
    public name: string = 'LeftButton';
    protected _zIndex: number = 30;
    private positionX: number = 50;
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
        button.on('touchstart', () => { this.toLeft() });

        this.addChild(container.resolve(Left).text);
        this.addChild(button);
    }

    addElement(e: BaseElement): void {
        this.element = e;
    }

    toLeft(): void {
        this.element.left();
    }
}