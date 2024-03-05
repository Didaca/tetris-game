/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: ICanvasParams.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  25.01.24 8:32 am.
 * Last modified: 25.01.24 8:32 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';

export interface GlobalThis {
    __PIXI_APP__: PIXI.Application<HTMLCanvasElement>
}