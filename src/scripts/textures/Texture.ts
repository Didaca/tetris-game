import * as PIXI from 'pixi.js';
import Log from '../components/Log';


class Textures {
    protected _complited: boolean = false;
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
    protected buttonLeft: any;
    protected buttonRight: any;
    protected buttonRotate: any;

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
        this.pillerImage = await PIXI.Assets.load('/resources/images/ppI.png');
        this.stickRTexture = await PIXI.Assets.load('/resources/images/stickR.png');
        this.stickRImage = await PIXI.Assets.load('/resources/images/stickRImage.png');
        this.tTexture = await PIXI.Assets.load('/resources/images/t.png');
        this.tImage = await PIXI.Assets.load('/resources/images/tImage.png');
        this.zRTexture = await PIXI.Assets.load('/resources/images/zR.png');
        this.zRImage = await PIXI.Assets.load('/resources/images/zRImage.png');
        this.buttonLeft = await PIXI.Assets.load('/resources/images/arr-l.png');
        this.buttonRight = await PIXI.Assets.load('/resources/images/arr-r.png');
        this.buttonRotate = await PIXI.Assets.load('/resources/images/rotate.png');


        if (this.zRImage) {
            this._complited = true;
            Log.log('ASSETS LOADED!');
        }
    }

    get complited(): any {
        return this._complited;
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
            case 'B_LEFT':
                return this.buttonLeft;
            case 'B_RIGHT':
                return this.buttonRight;
            case 'ROTATE':
                return this.buttonRotate;
            default:
                break;
        }

    }

}

export default new Textures();