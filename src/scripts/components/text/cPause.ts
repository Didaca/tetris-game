/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cPause.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  31.01.24 1:43 pm.
 * Last modified: 31.01.24 1:43 pm.
 * 
 * More information at: https://egt-digital.com/
 */
import { TextCenter } from "./cTextCenter";


export class Pause extends TextCenter {
    readonly x: number = 220; //225

    constructor(txt: string) {
        super(txt)
        this.text.anchor.set(0.5);
        this.text.x = this.x;
    }
}