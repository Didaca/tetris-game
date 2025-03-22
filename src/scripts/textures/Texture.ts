import * as PIXI from 'pixi.js';
import Log from '../components/Log';
import Observables from '../components/Observables';


class Textures {
    protected logoTexture: any;
    protected baseTexture: any;
    protected backgroundTexture: any;
    protected transparentTexture: any;
    protected cubeTexture: any;
    protected cubeImage: any;
    protected pillerTexture: any;
    protected pillerImage: any;
    protected stickRTexture: any;
    protected stickRImage: any;
    protected tTexture: any;
    protected tImage: any;
    protected zRTexture: any;
    protected zRImage: any;
    protected nextElementText: any;
    protected scoreElementText: any;

    constructor() {
        this.init();
    }


    protected async init(): Promise<void> {
        Log.log('START ASSETS LOADING!');

        this.logoTexture = await PIXI.Assets.load('/resources/images/logo.png');
        this.baseTexture = await PIXI.Assets.load('/resources/images/transparent.png');
        this.backgroundTexture = await PIXI.Assets.load('/resources/images/background.png');
        this.transparentTexture = await PIXI.Assets.load('/resources/images/transparent.png');
        this.cubeTexture = await PIXI.Assets.load('/resources/images/cube.png');
        this.cubeImage = await PIXI.Assets.load('/resources/images/cubeImage.png');
        this.pillerTexture = await PIXI.Assets.load('/resources/images/piller.png');
        this.pillerImage = await PIXI.Assets.load('/resources/images/pillerImage.png');
        this.stickRTexture = await PIXI.Assets.load('/resources/images/stickR.png');
        this.stickRImage = await PIXI.Assets.load('/resources/images/stickRImage.png');
        this.tTexture = await PIXI.Assets.load('/resources/images/t.png');
        this.tImage = await PIXI.Assets.load('/resources/images/tImage.png');
        this.zRTexture = await PIXI.Assets.load('/resources/images/zR.png');
        this.zRImage = await PIXI.Assets.load('/resources/images/zRImage.png');
        this.nextElementText = await PIXI.Assets.load('/resources/images/next.png');
        this.scoreElementText = await PIXI.Assets.load('/resources/images/score.png');


        if (this.scoreElementText) {
            Observables.LoadAssets.next(true);
            Log.log('ASSETS LOADED!');
        }
    }

    public getTexture(name: string): any {

        switch (name) {
            case 'LOGO':
                return this.logoTexture;
            case 'BACKGROUND':
                return this.backgroundTexture;
            case 'TRANSPARENT':
                return this.transparentTexture;
            case 'BASE':
                return this.baseTexture;
            case 'NEXT':
                return this.nextElementText;
            case 'SCORE':
                return this.scoreElementText;
            case 'CUBE':
                return this.cubeTexture;
            case 'CUBE_IMAGE':
                return this.cubeImage;
            case 'PILLER':
                return this.pillerTexture;
            case 'PILLER_IMAGE':
                return this.pillerImage;
            case 'STICK_R':
                return this.stickRTexture;
            case 'STICK_R_IMAGE':
                return this.stickRImage;
            case 'T':
                return this.tTexture;
            case 'T_IMAGE':
                return this.tImage;
            case 'Z_R':
                return this.zRTexture;
            case 'Z_R_IMAGE':
                return this.zRImage;
            default:
                break;
        }

    }

}

export default new Textures();