import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';


@singleton()
export class TextStartGame {
    readonly x: number = 234.5;
    readonly y: number = 400;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text("Tap To Start Game",
            new PIXI.TextStyle({
                fontFamily: 'Dotrice',
                fontSize: 30,
                trim: true,
                fill:'#8bc34a',
            }))
        this._text.name = 'TextStartGame';
        this._text.anchor.set(0.5, 0.5);
        this._text.x = this.x;
        this._text.y = this.y;
    }

    public get text(): PIXI.Text {
        return this._text;
    }
}
