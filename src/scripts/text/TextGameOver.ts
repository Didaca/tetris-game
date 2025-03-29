import * as PIXI from 'pixi.js';
import { singleton } from 'tsyringe';


@singleton()
export class TextGameOver {
    readonly x: number = 234.5;
    readonly y: number = 400;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text("Game Over",
            new PIXI.TextStyle({
                fontFamily: 'Dotrice',
                fontSize: 30,
                trim: true,
                fill:'#ff4336',
            }))
        this._text.name = 'TextGameOver';
        this._text.anchor.set(0.5);
        this._text.x = this.x;
        this._text.y = this.y;
    }

    public get text(): PIXI.Text {
        return this._text;
    }
}
