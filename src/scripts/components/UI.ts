import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';

@injectable()
export class UIContainer extends PIXI.Container {
    public name: string = 'UIContainer';
    protected _zIndex: number = 30;

    constructor() {
        super();
    }
}