import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';


@singleton()
export class Left {
    readonly x: number = 150;
    readonly y: number = 711;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text("LEFT",
            new PIXI.TextStyle({
                fontFamily: 'Dotrice',
                fontSize: 42,
                trim: true,
                fill: 0xFCEBB6,
            }))
        this._text.name = 'TextLeft';
        this._text.anchor.set(1, 0);
        this._text.x = this.x;
        this._text.y = this.y;
        this._text.width = 80;
        this._text.height = 30;
    }

    public get text(): PIXI.Text {
        return this._text;
    }
}
