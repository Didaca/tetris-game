import * as PIXI from 'pixi.js';
import { GlobalThis } from '../interfaces/IAppParams';
import { Names } from '../enums/Names';
import { FpsMeter } from './fps-meter';

export class Engine {
    public container: HTMLElement;
    public app: PIXI.Application<HTMLCanvasElement>;
    public containerId: string = Names.CONTAINERid;
    public fpsMeter: FpsMeter;
    public fpsMeterItem: HTMLElement;
    private scaleW: number = 590; // backgroundW: 590
    private scaleH: number = 960; // backgroundH: 960
    private gameRatio: number = this.scaleW / this.scaleH;
    private canvasW: number = 590; 
    private canvasH: number = this.canvasW / this.gameRatio;
    private fpsMax: number = 60;

    constructor() {
        this.app = new PIXI.Application({
            width: this.canvasW,
            height: this.canvasH,
        });
        this.fpsMax = this.fpsMax;
        this.fpsMeter = new FpsMeter(() => { });
        this.fpsMeterItem = document.createElement(Names.DIV);

        (globalThis as any as GlobalThis).__PIXI_APP__ = this.app;

        this.container = this.containerId ? document.getElementById(this.containerId) || document.body : document.body;
        this.container.appendChild(this.app.view);

        this.app.stage.scale.set(Math.min(this.app.renderer.width / this.scaleW, this.app.renderer.height / this.scaleH)) 

    }

    public init(): void {
        this.createFPS();
        this.updateFPS();
    }

    public add(block: any) {
        this.app.stage.addChild(block);
    }

    private createFPS(): void {
        this.fpsMeterItem.classList.add('fps');
        this.container.appendChild(this.fpsMeterItem);

        this.fpsMeter = new FpsMeter(() => {
            this.fpsMeterItem.textContent = 'FPS: ' + this.fpsMeter.getFrameRate().toFixed(2).toString();
        });
    }

    private updateFPS(): void {
        this.app.ticker.add(() => {
            this.fpsMeter.updateTime();
        })
    }
}