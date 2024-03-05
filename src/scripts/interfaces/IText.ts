/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: IText.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  25.01.24 9:39 am.
 * Last modified: 25.01.24 9:39 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';

export interface IText {
    text: PIXI.Text;
    x: number;
    y: number;
}