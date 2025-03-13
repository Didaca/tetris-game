import * as PIXI from 'pixi.js';
import { injectable } from 'tsyringe';


@injectable()
export class Score {
    readonly x: number = 440;
    readonly y: number = 207;
    private _score: number = 0;
    private _text: PIXI.Text;

    constructor() {
        this._text = new PIXI.Text(`${this._score}`,
            new PIXI.TextStyle({
                fontFamily: 'EnergySpike',
                fontSize: 24,
                letterSpacing: 1.5,
                fill: 0xfcebb6,
            }))
            this._text.name = 'Score';
        this._text.anchor.set(1, 0);
        this._text.x = this.x;
        this._text.y = this.y;
    }

    public updateScore(lines: number) {
        this._score += lines;
        if (this._score > 9) {
            this._text.x = this.x + 12;
        }
        if (this._score > 99) {
            this._text.x = this.x + 16;
        }
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
