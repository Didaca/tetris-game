import * as PIXI from 'pixi.js';
import { container, singleton } from 'tsyringe';
import { TextGameOver } from '../text/TextGameOver';


@singleton()
export class GameOver extends PIXI.Container {
    public name: string = 'GameOver';
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
        mask.alpha = 0.65;

        // mask.eventMode = 'static';
        // mask.on('touchstart', () => { this.destroyThis() });

        this.addChild(mask);
        this.addChild(container.resolve(TextGameOver).text);
    }

    // private destroyThis(): void {
    //     this.destroy(true);
    //     Observables.ToStartGame.next(true);
    // }
}