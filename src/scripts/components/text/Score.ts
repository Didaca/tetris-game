import * as PIXI from 'pixi.js';
import { BaseText } from '../baseComponents/BaseText';
import { Texts } from '../../enums/Texts';
import { injectable } from 'tsyringe';


@injectable()
export class Score extends BaseText {
    readonly x: number = 440;
    readonly y: number = 207;
    private _score: number = 0;

    constructor() {
        super()
        this.text = new PIXI.Text(`${this._score}`,
            new PIXI.TextStyle({
                fontFamily: Texts.FONTFAMILY,
                fontSize: 24, //24
                letterSpacing: 1.5,
                fill: 0xfcebb6,
            }))
        this.text.anchor.set(1, 0);
        this.text.x = this.x;
        this.text.y = this.y;
    }

    public updateScore(lines: number) {
        this._score += lines;
        if (this._score > 99) {
            this.text.style.fontSize = 18;
            this.text.x = 410;
            this.text.y = 67;
        }
        this.text.text = this._score;
    }

    public resetScore(): void {
        this._score = 0;
        this.text.text = this._score;
    }
}
