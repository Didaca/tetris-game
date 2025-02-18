import * as PIXI from 'pixi.js';
import { GlobalThis } from '../interfaces/IAppParams';
import { Names } from '../enums/Names';
import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import Background from './Background';
import View from './View';
import Textures from '../textures/Texture';



@injectable()
export class Canvas {
    public body: HTMLElement;
    public app: PIXI.Application<HTMLCanvasElement>;
    public containerId: string = Names.CONTAINERid;
    private W: number = 469;
    private H: number = 800;
    private gameRatio: number = this.W / this.H;
    private viewContainer: any;
    private backgroundContainer: any;

    constructor() {
        this.app = new PIXI.Application({
            resizeTo: window,
            antialias: true,
            resolution: 1
        });

        (globalThis as any as GlobalThis).__PIXI_APP__ = this.app;

        this.body = this.containerId ? document.getElementById(this.containerId) || document.body : document.body;
        this.body.appendChild(this.app.view);

        this.app.stage.scale.set(Math.min(window.innerWidth / this.W), Math.min(window.innerHeight / this.H));
        
        this.resolveDependency();
        this.initBackground();

    }

    public initBackground(): void {
        this.viewContainer.addChild(this.backgroundContainer);
        this.app.stage.addChild(this.viewContainer);
        const backgroundSprite: PIXI.Sprite = new PIXI.Sprite(Textures.getTexture('BACKGROUND'));
        backgroundSprite.x = 0;
        backgroundSprite.y = 0;
        this.backgroundContainer.addChild(backgroundSprite);
    }

    public addContainer(container: PIXI.Container): void {
        this.viewContainer.addChild(container);
    }

    get stage(): any {
        return this.app.stage;
    }

    get view(): any {
        return this.app.view;
    }

    get renderer(): any {
        return this.app.renderer;
    }

    get width(): number {
        return this.W;
    }

    get height(): number {
        return this.H;
    }

    private resolveDependency(): void {
        this.viewContainer = container.resolve(View);
        this.backgroundContainer = container.resolve(Background);
    }
}