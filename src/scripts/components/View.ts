import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';

@injectable()
export default class View extends PIXI.Container {
    public name: string = 'View';
    sortableChildren: boolean = true;
}