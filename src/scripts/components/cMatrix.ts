/*
 * Copyright (c) 2021 EGT Digital - All rights reserved.
 * 
 * File: cMatrix.ts
 * 
 * Written by Deyan Ivanov <deyan.ivanov@egt-digital.com> on  01.02.24 8:20 am.
 * Last modified: 01.02.24 8:20 am.
 * 
 * More information at: https://egt-digital.com/
 */
import * as PIXI from 'pixi.js';
import { Piller } from './elements/cPiller';
import { Stick } from './elements/cStick';
import { Cube } from './elements/cCube';
import { Z } from './elements/cZ';
import { T } from './elements/cT';
import { Numbers } from '../enums/Numbers';
import { Types } from '../enums/ElementTypes';
import { Directions } from '../enums/Directions';
import { EPositions } from '../enums/Positions';
import { gsap } from 'gsap';


export class Matrix extends PIXI.Container {
    readonly matrixRow: number = 34;
    readonly matrixCol: number = 16;
    readonly spriteSize: number = 25; // 25
    readonly spriteXstart: number = 31; // 31
    readonly spriteYstart: number = 105; // 105
    readonly baseElementsCount: number = 5;
    private arrayElements: Array<T>;
    private emptyTexture: PIXI.Texture;
    private element: any;

    constructor(public name: string, emptyTexture: PIXI.Texture) {
        super()
        this.name = name;
        this.emptyTexture = emptyTexture;
        this.arrayElements = [];
    }

    public init(): void {
        this.loadRowContainers();
        this.drawElement();
        this.generateElement();
    }

    // loading rowContainer with sprites
    private createRowContainer(row: number): PIXI.Container {
        const rowContainer = new PIXI.Container();
        for (let col = 0; col < this.matrixCol; col++) {
            const sprite: PIXI.Sprite = new PIXI.Sprite(this.emptyTexture);
            sprite.anchor.set(0.5);
            sprite.width = this.spriteSize;
            sprite.height = this.spriteSize;
            sprite.x = this.spriteXstart + col * this.spriteSize;
            sprite.y = this.spriteYstart + row * this.spriteSize;
            rowContainer.addChild(sprite as any);
        }
        return rowContainer;
    }

    // loading rowContainers in Matrix Container
    public loadRowContainers(): void {
        const listContainers: PIXI.Container[] = [];
        for (let row = 0; row < this.matrixRow; row++) {
            const rowContainer = this.createRowContainer(row);
            listContainers.push(rowContainer);
        }

        for (let col = 0; col < listContainers.length; col++) {
            this.addChild((listContainers as any)[col]);
        }
    }

    // drawing first element in Matrix Container
    public drawElement(): void {
        this.generateElement();
        this.element = this.arrayElements.shift();
        this.element.draw(this);
    }

    // check row 0 for texture
    public isGameOver(): boolean {
        const result = (this.children[Numbers.ZERO] as any).children
            .filter((sprite: PIXI.Sprite) => sprite.texture !== this.emptyTexture);
        return (result.length > Numbers.ZERO);
    }

    // return texture of the next element in queue
    public getNextElementTexture(): PIXI.Texture {
        return this.arrayElements[Numbers.ZERO].image;
    }

    // generate element and push in stack[]
    private generateElement(): void {
        const element: number = Math.floor(Math.random() * this.baseElementsCount);
        // const element = 4;  // for test
        switch (element) {
            case 0:
                this.arrayElements.push(new Piller());
                break;
            case 1:
                this.arrayElements.push(new Stick());
                break;
            case 2:
                this.arrayElements.push(new Cube());
                break;
            case 3:
                this.arrayElements.push(new Z());
                break;
            case 4:
                this.arrayElements.push(new T());
                break;
        }
    }

    // check is`t row-container has some texture
    private isLine(cont: any): boolean {
        const result: Array<PIXI.Sprite> = cont.children
            .filter((sprite: PIXI.Sprite) => sprite.texture !== this.emptyTexture);
        return (result.length === this.matrixCol);
    }

    // replace textures between rows
    public cleanLines(row: number, lines: number): void {
        for (let i = 0; i < lines; i++) {
            let r = row;
            while (r > 0) {
                const sprites = (this.children[r - Numbers.ONE] as any)?.children.filter((sprite: PIXI.Sprite) => sprite.texture);
                (this.children[r] as any)?.children.map((sprite: PIXI.Sprite) => sprite.texture = sprites.shift().texture);

                r -= Numbers.ONE;
            }
        }
    }

    // animate full row-container/containers 
    public async anime(lines: Array<PIXI.Container>): Promise<void> {
        await gsap.timeline({ repeat: 2, yoyo: true })
            .to(lines, { alpha: -0.01 })
            .to(lines, { alpha: 1 });
    }

    // return filled row
    public getLines(): [PIXI.Container[], number] {
        let row: number = 0;
        const containersLine = this.children.filter(c => this.isLine(c) ? c : null)

        if (containersLine.length > 0) {
            row = this.getChildIndex(containersLine[containersLine.length - 1]);
        }

        return [containersLine as Array<PIXI.Container>, row];
    }

    // clean element`s blocks before drawing again 
    private cleanElement(): void {
        const coordinates = this.element.coordinates;
        for (let row = 0; row < coordinates.length; row++) {
            const [r, c] = coordinates[row];
            (this.children[r] as any).children[c].texture = this.element.baseTexture
        }
    }

    // move Down section
    public moveDown(): void {
        const coordinates: number[][] = this.element.getCoordinates();
        this.cleanElement();
        for (let row = 0; row < coordinates.length; row++) {
            const [r, c] = coordinates[row];
            (this.children[r + Numbers.ONE] as any).children[c].texture = this.element.texture
        }
        this.element.setDownCoordinates();
    }

    public isToMoveDown(): boolean {
        let result: boolean = true;
        const type: string = this.element.type;
        const position: string = this.element.position;
        const allRows: number = this.matrixRow;
        const coordinates: number[][] = this.element.getCoordinates();

        if (position === EPositions.POS0 ||
            position === EPositions.POS180 && type === Types.T
        ) {
            result = this.isToMoveDown1(coordinates, allRows);
        }
        if (position === EPositions.POS90 ||
            position === EPositions.POS180 && type === Types.STICK ||
            position === EPositions.POS270 && type === Types.STICK ||
            position === EPositions.POS270 && type === Types.T
        ) {
            result = this.isToMoveDown2(coordinates, allRows, type, position);
        }
        return result
    }

    private isToMoveDown1(coordinates: any, allRows: number): boolean {
        let empty: boolean = true;
        let count: number = coordinates.length - Numbers.ONE;
        for (let r = 0; r < this.element.elementLenght; r++) {
            const [row, col] = coordinates[count]
            if (row === allRows - Numbers.ONE) {
                empty = false;
            } else {
                (this.children[row + Numbers.ONE] as any).children[col].texture !== this.element.baseTexture ? empty = false : null;
                count -= Numbers.ONE;
            }
        }
        return empty;
    }

    private isToMoveDown2(coordinates: any, allRows: number, type: string, position: string): boolean {
        let empty: boolean = true;
        let count: number = Numbers.ZERO;
        for (let r = 0; r < coordinates.length; r++) {
            let [row, col] = coordinates[r];
            if ((row === allRows - Numbers.ONE && type === Types.PILLER) || row > allRows - Numbers.TWO) {
                empty = false;
            } else {
                (this.children[row + 1] as any).children[col].texture !== this.element.baseTexture ? count++ : null;
            }
        }
        (type === Types.PILLER && count > 0) ? empty = false : null;
        (type === Types.STICK && position !== EPositions.POS180 && count > Numbers.ONE) ? empty = false : null;
        count > Numbers.TWO ? empty = false : null;
        return empty;
    }


    // move Left or Right section
    private isLeftCornerCasesMoves(column: number, type: string, position: string): boolean {
        if (column === 0 ||
            column === 1 && type === Types.PILLER && position === EPositions.POS90 ||
            column === 1 && type === Types.Z ||
            column === 1 && type === Types.T && position !== EPositions.POS270 ||
            column === 0 && type === Types.T && position === EPositions.POS270 ||
            column === 1 && type === Types.STICK && position === EPositions.POS180 ||
            column === 1 && type === Types.STICK && position === EPositions.POS90 ||
            column === 1 && type === Types.STICK && position === EPositions.POS270
        ) {
            return false;
        }
        return true;
    }

    private isRightCornerCasesMoves(column: number, type: string, position: string, elementHeight: number): boolean {
        let endPoint = this.element.elementLenght;
        const allColumns = this.matrixCol;
        type === Types.Z || type === Types.T ? endPoint = elementHeight : null;
        if (type === Types.PILLER && position === EPositions.POS90 ||
            type === Types.Z && position === EPositions.POS90 ||
            type === Types.T && position === EPositions.POS90 ||
            type === Types.STICK && position === EPositions.POS180
        ) {
            endPoint = 1
        };
        if (column === allColumns - endPoint) {
            return false;
        } else if (type === Types.PILLER && position === EPositions.POS90 && column === (allColumns - (elementHeight - endPoint))) {
            return false;
        }
        return true;
    }

    public isToMoveLorR(direction: string): boolean {
        let empty: boolean = true;
        // counting sprites with texture on the left side or on the right  side of each coordinate (block
        let count: number = 0;
        const type = this.element.type;
        const position = this.element.position;
        const elementHeight = this.element.elementHeight;
        const column = this.element.startPosition;
        const coordinates = this.element.getCoordinates();
        for (let r = 0; r < coordinates.length; r++) {
            let [row, col] = coordinates[r];
            if (direction === Directions.LEFT) {
                empty = this.isLeftCornerCasesMoves(column, type, position);
                if (empty) {
                    (this.children[row] as any).children[col - Numbers.ONE].texture !== this.element.baseTexture ? count++ : null;
                }
            } else {
                empty = this.isRightCornerCasesMoves(column, type, position, elementHeight);
                if (empty) {
                    (this.children[row] as any).children[col + Numbers.ONE].texture !== this.element.baseTexture ? count++ : null;
                }
            }
        }
        if (type === Types.PILLER && position === EPositions.POS0 && count > 0 ||
            type === Types.PILLER && position === EPositions.POS90 && count > 3 ||
            type === Types.STICK && position !== EPositions.POS90 && position !== EPositions.POS270 && count > 1 ||
            type === Types.T && position !== EPositions.POS0 && position !== EPositions.POS180 && count > 1
        ) {
            empty = false;
        }
        type !== Types.PILLER && count > 2 ? empty = false : null;
        return empty;
    }

    public moveLeftOrRight(direction: string): void {
        const coordinates = this.element.getCoordinates();
        this.cleanElement();
        for (let row = 0; row < coordinates.length; row++) {
            const [r, c] = coordinates[row];
            if (direction === Directions.LEFT) {
                (this.children[r] as any).children[c - Numbers.ONE].texture = this.element.texture;
            } else {
                (this.children[r] as any).children[c + Numbers.ONE].texture = this.element.texture;
            }
        }
        direction === Directions.LEFT ? this.element.setLeftCoordinates() : this.element.setRightCoordinates();
    }

    // rotation section
    public rotate(): void {
        this.cleanElement();
        this.element.cleanCoordinates();
        this.element.reDraw(this);
    }

    public isToRotate(): boolean {
        let empty: boolean = true;
        const allColumns = this.matrixCol;
        const type = this.element.type;
        const column = this.element.startPosition;
        const row = this.element.lastRowContainerIndex;
        if (type === Types.CUBE ||
            type === Types.Z && row === 0 ||
            type === Types.Z && column === allColumns - Numbers.ONE ||
            type === Types.T && row === 0 ||
            type === Types.T && column === allColumns - Numbers.ONE ||
            type === Types.STICK && column === 0 ||
            type === Types.STICK && column === allColumns - Numbers.ONE) {
            empty = false;
        }

        if (empty) {
            empty = this.element.verificateNewPosition(this);
        }
        return empty;
    }

    // replace all textures with emptyTexture
    private cleanMatrix(): void {
        let row = this.matrixRow - 1;
        while (row >= 0) {
            this.children[row].children?.forEach(ch => (ch as PIXI.Sprite).texture = this.emptyTexture);
            row -= 1;
        }
    }

    public resetMatrix(): void {
        this.cleanMatrix();
        this.drawElement();
        this.generateElement();
    }

}