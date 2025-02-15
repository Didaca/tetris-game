import * as PIXI from 'pixi.js';
import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import Textures from '../textures/Texture';
import { Canvas } from './Canvas';
import { Cube } from './elements/Cube';
import { Container } from './Container';
import { BaseElement } from './baseComponents/BaseElement';
import { Numbers } from '../enums/Numbers';



@injectable()
export class Matrix extends PIXI.Container {
    readonly matrixRow: number = 30;
    readonly matrixCol: number = 17;
    readonly firstRow: number = 2;
    readonly spriteSize: number = 20;
    protected _zIndex: number = 20;
    readonly name: string = 'Matrix';
    public arrayElements: Array<BaseElement>;
    protected baseTexture: any;
    private containerBounceX: number;
    private containerBounceY: number;
    private canvas: Canvas;
    private tetromino: any;

    constructor(board: Canvas) {
        super()
        this.tetromino = '';
        this.arrayElements = [];
        this.canvas = board;
        this.baseTexture = Textures.getTexture('BASE');
        this.containerBounceX = Math.round((this.canvas.width - (this.spriteSize * this.matrixCol)) / 2);
        this.containerBounceY = Math.round((this.canvas.height - (this.spriteSize * this.matrixRow)) / 3);
        this.init();

    }

    private init(): void {
        this.loadRowContainers();
        this.canvas.addContainer(this);
        this.drawElement();
        this.generateElement();
    }

    // loading rowContainer with sprites
    private createRowContainer(row: number): any {
        const rowContainer = container.resolve(Container);
        rowContainer.name = `${row}`;

        if (row === 0 || row === 1) {
            this.setVisibility(rowContainer);
        }


        for (let col = 0; col < this.matrixCol; col++) {
            const sprite: PIXI.Sprite = new PIXI.Sprite(Textures.getTexture('TRANSPARENT'));
            sprite.width = this.spriteSize;
            sprite.height = this.spriteSize;
            sprite.x = this.containerBounceX + col * this.spriteSize;
            sprite.y = this.containerBounceY + row * this.spriteSize;
            rowContainer.addChild(sprite as any);

        }
        return rowContainer;
    }

    // loading rowContainers in Matrix Container
    private loadRowContainers(): void {
        const listContainers: PIXI.Container[] = [];
        for (let row = 0; row < this.matrixRow; row++) {
            const rowContainer = this.createRowContainer(row);
            listContainers.push(rowContainer);
        }

        listContainers.forEach(
            (container) => {
                this.addChild(container);
            }
        )
    }

    private setVisibility(a: any) {
        a.alpha === 1 ? a.alpha = 0 : a.alpha = 1; 
    }

    public get element(): any {
        return this.tetromino;
    }

    public get baseT(): any {
        return this.baseTexture;
    }

    public toGO(): boolean {
        const result = (this.children[this.firstRow] as any).children
            .filter((sprite: any) => sprite.texture !== this.baseTexture);
        return (result.length === Numbers.ZERO);
    }
    
    // generate element and push in stack[]
    private generateElement(): void {
        // const element: number = Math.floor(Math.random() * this.baseElementsCount);
        const element = 2;
        switch (element) {
            // case 0:
            //     this.arrayElements.push(new Piller(this));
            //     break;
            // case 1:
            //     this.arrayElements.push(new Stick());
            //     break;
            case 2:
                this.arrayElements.push(new Cube(this));
                break;
            // case 3:
            //     this.arrayElements.push(new Z());
            //     break;
            // case 4:
            //     this.arrayElements.push(new T());
            //     break;
        }
    }
    
    public drawElement(): void {
        this.generateElement();
        this.tetromino = this.arrayElements.shift();
        this.tetromino.draw();
    }

}