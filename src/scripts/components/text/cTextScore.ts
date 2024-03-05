import * as PIXI from 'pixi.js';
import { BaseText } from "../baseComponents/cBaseText";
import { Texts } from '../../enums/Texts';


export class ScoreTXT extends BaseText {
    readonly x: number = 484; // 490
    readonly y: number = 111; // 111

    constructor(txt?: string) {
        super()
        this.text = new PIXI.Text(txt,
            new PIXI.TextStyle({
                fontFamily: Texts.FONTFAMILY,
                fontSize: 20, //20
                letterSpacing: 1.5,
                fill: 0xfcebb6,
                dropShadow: true,
                dropShadowColor: 0x494646,
                dropShadowAlpha: 1,
                dropShadowDistance: 2,
                align: 'justify'
            }))
        this.text.anchor.set(0.5);
        this.text.x = this.x;
        this.text.y = this.y;
    }
}