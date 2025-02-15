import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';

@injectable()
export class Container extends PIXI.Container {
    public name: string = 'Container';

    constructor() {
        super();
    }
}