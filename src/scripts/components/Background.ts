import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';

@injectable()
export default class Background extends PIXI.Container {
    public name: string = 'Background';
    protected _zIndex: number;

    constructor() {
        super();
        this._zIndex = 10;
    }
}

