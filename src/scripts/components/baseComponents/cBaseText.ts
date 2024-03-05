/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cBaseText.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  26.01.24 8:49 am.
 * Last modified: 26.01.24 8:49 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';
import { IText } from '../../interfaces/IText';
import { Texts } from '../../enums/Texts';


export class BaseText implements IText {
    readonly txt: string = '';
    readonly x: number = 0;
    readonly y: number = 0;
    public text: PIXI.Text | any;

    constructor(txt?: string) {
        this.text = new PIXI.Text(txt,
            new PIXI.TextStyle({
                fontFamily: Texts.FONTFAMILY,
            }));
        this.text.anchor.set(0.5);
        this.text.x = this.x;
        this.text.y = this.y;
    }
}