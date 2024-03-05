 /*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cGameOver.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  25.01.24 9:43 am.
 * Last modified: 25.01.24 9:43 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';
import { BaseText } from '../baseComponents/cBaseText';
import { Texts } from '../../enums/Texts';


export class TextCenter extends BaseText {
    readonly x: number = 218; // 145
    readonly y: number = 485; // 485

    constructor(txt: string) {
        super()
        this.text = new PIXI.Text(txt,
            new PIXI.TextStyle({
                fontFamily: Texts.FONTFAMILY,
                fontSize: 60, //60
                fill: 0xfcebb6,
                dropShadow: true,
                dropShadowColor: 0xEFEEDB,
                dropShadowAlpha: 1,
                dropShadowDistance: 2,
            }))
        this.text.anchor.set(0.5);
        this.text.x = this.x;
        this.text.y = this.y;
    }

}

