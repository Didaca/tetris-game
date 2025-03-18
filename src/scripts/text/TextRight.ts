import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';


@singleton()
export class Right {
    readonly x: number = 419;
    readonly y: number = 711;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text("RIGHT",
            new PIXI.TextStyle({
                fontFamily: 'Dotrice',
                fontSize: 42,
                trim: true,
                fill: 0xFCEBB6,
            }))
        this._text.name = 'TextRight';
        this._text.anchor.set(1, 0);
        this._text.x = this.x;
        this._text.y = this.y;
        this._text.width = 100;
        this._text.height = 30;
    }

    public get text(): PIXI.Text {
        return this._text;
    }
}
