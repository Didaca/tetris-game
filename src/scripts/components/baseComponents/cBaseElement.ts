/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cBaseElement.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  26.01.24 9:26 am.
 * Last modified: 26.01.24 9:26 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';
import { IElement } from '../../interfaces/IElement';
import { emptyTexture } from '../../textures/textures';
import { Numbers } from '../../enums/Numbers';

export class BaseElement implements IElement {
    type: string = '';
    elementHeight: number = 0;
    elementLenght: number = 0;
    lastRowContainerIndex: number = 0;
    position: string = '0';
    texture: PIXI.Texture | undefined;
    image: PIXI.Texture | undefined;
    startPosition: number = 7;
    coordinates: number[][] = [];
    baseTexture: PIXI.Texture = emptyTexture;

    draw(container: PIXI.Container): void { }

    updatePosition(): void { }

    reDraw(container: PIXI.Container): void { }

    verificateNewPosition(container: PIXI.Container): boolean {
        let empty: boolean = true;
        return empty
    }

    getCoordinates(): Array<number>[] {
        return this.coordinates
    }

    cleanCoordinates(): void {
        this.coordinates = [];
    }

    setDownCoordinates(): void {
        this.coordinates.forEach(coordinate => {
            coordinate[Numbers.ZERO] += Numbers.ONE;
        })
        this.lastRowContainerIndex += Numbers.ONE;
    }

    setLeftCoordinates(): void {
        this.coordinates.forEach(coordinate => {
            coordinate[Numbers.ONE] -= Numbers.ONE;
        })
        this.startPosition -= Numbers.ONE;
    }

    setRightCoordinates(): void {
        this.coordinates.forEach(coordinate => {
            coordinate[Numbers.ONE] += Numbers.ONE;
        })
        this.startPosition += Numbers.ONE;
    }

    // setCoordinates(direction?: string): void {
    //     if (direction === Directions.LEFT) {
    //         this.coordinates.forEach(coordinate => {
    //             coordinate[Numbers.ONE] -= Numbers.ONE;
    //         })
    //         this.startPosition -= Numbers.ONE;
    //     } else if (direction === Directions.RIGHT) {
    //         this.coordinates.forEach(coordinate => {
    //             coordinate[Numbers.ONE] += Numbers.ONE;
    //         })
    //         this.startPosition += Numbers.ONE;
    //     } else {
    //         this.coordinates.forEach(coordinate => {
    //             coordinate[Numbers.ZERO] += Numbers.ONE;
    //         })
    //         this.lastRowContainerIndex += Numbers.ONE;
    //     }

    // }

}