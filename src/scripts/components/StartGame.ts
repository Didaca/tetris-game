import * as PIXI from 'pixi.js';
import { container, singleton } from 'tsyringe';
import Observables from './Observables';
import { TextStartGame } from '../text/TextStartGame';


@singleton()
export class StartGame extends PIXI.Container {
    public name: string = 'StartGame';
    protected _zIndex: number = 90;
    private positionX: number = 0;
    private positionY: number = 0;
    private maskWidth: number = 469;
    private maskHeight: number = 800;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        const mask: PIXI.Graphics = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRect(this.positionX, this.positionY, this.maskWidth, this.maskHeight);
        mask.endFill();
        mask.alpha = 0.50;

        mask.eventMode = 'static';
        mask.on('touchstart', () => { this.destroyThis() });

        this.addChild(mask);
        this.addChild(container.resolve(TextStartGame).text);
    }

    private destroyThis(): void {
        this.destroy(true);
        Observables.ToStartGame.next(true);
    }
}