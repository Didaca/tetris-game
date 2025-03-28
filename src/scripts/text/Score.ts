import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';


@injectable()
export class Score {
    readonly x: number = 431;
    readonly y: number = 207;
    private _zIndex: number = 20;
    private _score: number = 0;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text(`${this._score}`,
            new PIXI.TextStyle({
                fontFamily: 'EnergySpike',
                fontSize: 32,
                letterSpacing: 1.5,
                fill: 0xfcebb6,
                trim: true,
            }))
            this._text.name = 'Score';
        this._text.anchor.set(0.5, 0);
        this._text.x = this.x;
        this._text.y = this.y;
        this._text.zIndex = this._zIndex;
    }

    public updateScore(lines: number) {
        this._score += lines;
        this._text.text = this._score;
    }

    public resetScore(): void {
        this._score = 0;
        this._text.text = this._score;
    }

    public get text(): PIXI.Text {
        return this._text;
    }
}
