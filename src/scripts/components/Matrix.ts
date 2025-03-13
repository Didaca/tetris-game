import * as PIXI from 'pixi.js';
// import gsap from 'gsap';
import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import Textures from '../textures/Texture';
import { Canvas } from './Canvas';
import { Cube } from '../elements/Cube';
import { Container } from './Container';
import { BaseElement } from '../baseComponents/BaseElement';
import { Numbers } from '../enums/Numbers';
import { StickR } from '../elements/StickR';
import { ZR } from '../elements/ZR';
import { T } from '../elements/T';
import { Piller } from '../elements/Piller';
import { IMatrix } from '../interfaces/IMatrix';
import Observables from './Observables';



@singleton()
export class Matrix extends PIXI.Container implements IMatrix {
    public readonly matrixRow: number = 30;
    public readonly matrixCol: number = 17;
    public readonly firstVisiblyRow: number = 2;
    public readonly spriteSize: number = 20;
    public readonly name: string = 'Matrix';
    public arrayElements: Array<BaseElement>;
    protected _zIndex: number = 20;
    protected _baseElementsCount: number = 10;
    protected _linesCount: number = 0;
    protected baseTexture: any;
    private containerBounceX: number;
    private containerBounceY: number;
    private tetromino: any;

    constructor(private canvas: Canvas) {
        super()
        this.tetromino = '';
        this.arrayElements = [];
        this.baseTexture = Textures.getTexture('BASE');
        this.containerBounceX = Math.round((this.canvas.width - (this.spriteSize * this.matrixCol)) / 2);
        this.containerBounceY = Math.round((this.canvas.height - (this.spriteSize * this.matrixRow)) / 3);
        Observables.FinishLineAnime.subscribe(this.replaceRowContainers.bind(this));
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

    public getnextElementImage(): PIXI.Texture {
        return (this.arrayElements[0].image as PIXI.Texture);
    }

    public get element(): any {
        return this.tetromino;
    }

    public get baseT(): any {
        return this.baseTexture;
    }

    public get linesCount(): number {
        return this._linesCount;
    }

    public setLinesCount(a: number): void {
        this._linesCount = a;
    }

    public hasLines(): boolean {
        return this.getlines().length !== 0;
    }

    public isGameOver(): boolean {
        const result = (this.children[this.firstVisiblyRow] as any).children
            .filter((sprite: any) => sprite.texture !== this.baseTexture);
        return (result.length > Numbers.ZERO);
    }

    private isLine(row: number): boolean {
        const result = (this.children[row] as any).children
            .filter((sprite: any) => sprite.texture !== this.baseTexture);
        return (result.length === this.matrixCol);
    }

    // public async anime(sprite: any): Promise<void> {
    //     await gsap.timeline({ repeat: 2, yoyo: true })
    //         .to(sprite, { alpha: -0.01 })
    //         .to(sprite, { alpha: 1 });
    // }

    private replaceRowContainers(): void {
        if (Observables.FinishLineAnime.value) {
            let r = Observables.LineToAnime.value;
            while (r > 0) {
                const sprites = (this.children[r - Numbers.ONE] as any)?.children.filter((sprite: PIXI.Sprite) => sprite.texture);
                (this.children[r] as any)?.children.map((sprite: PIXI.Sprite) => sprite.texture = sprites.shift().texture);

                r -= Numbers.ONE;
            }
            Observables.FinishLineAnime.next(false);
        }
    }

    private updateRows(lines: number[]): void {
        for (let i = 0; i < lines.length; i++) {
            let r: any = lines[0];
            this.lineAnime(r);
            Observables.LineToAnime.next(r);
        }
    }

    public cleanLines(): void {
        const lines: number[] = this.getlines();
        if (lines.length > 0) {
            this.setLinesCount(lines.length);
            this.updateRows(lines);
        }
        Observables.FinishLinesReplaced.next(true);
    }

    private getlines(): number[] {
        let lines: number[] = [];
        const row: number = this.getRowToLine();

        for (let i = row; i > row - 6; i -= 1) {
            if (this.isLine(i)) {
                lines.push(i);
            }
        }
        return lines;
    }

    private getRowToLine(): number {
        let row: number = this.tetromino.coordinates[0];

        if (row === this.matrixRow - 1) {
            return row;
        }
        if (row === this.matrixRow - 2) {
            return row += 1;
        }

        return row += 2;
    }



    // generate element and push in stack[]
    private generateElement(): void {
        const element: number = Math.floor(Math.random() * this._baseElementsCount);
        // const element = 0;
        switch (element) {
            case 0:
                this.arrayElements.push(new Piller(this));
                break;
            case 1:
                this.arrayElements.push(new StickR(this));
                break;
            case 2:
                this.arrayElements.push(new Cube(this));
                break;
            case 3:
                this.arrayElements.push(new ZR(this));
                break;
            case 4:
                this.arrayElements.push(new T(this));
                break;
            case 8:
                this.arrayElements.push(new Piller(this));
                break;
            case 6:
                this.arrayElements.push(new StickR(this));
                break;
            case 5:
                this.arrayElements.push(new Cube(this));
                break;
            case 7:
                this.arrayElements.push(new ZR(this));
                break;
            case 9:
                this.arrayElements.push(new T(this));
                break;
            case 10:
                this.arrayElements.push(new StickR(this));
                break;
            default:
                this.arrayElements.push(new T(this));
                break;
        }
    }

    public drawElement(): void {
        this.generateElement();
        this.tetromino = this.arrayElements.shift();
        this.tetromino.draw();
    }

    private lineAnime(r: number): void {

        const lineAnime = new PIXI.AnimatedSprite(Textures.getAnimation('LINE'));

        lineAnime.width = 340;
        lineAnime.height = 20;
        lineAnime.x = 67;
        lineAnime.y = r * 20 + 67;
        lineAnime.animationSpeed = 0.5;
        lineAnime.play();
        this.addChild(lineAnime);

        const timeOut = setTimeout(() =>
            [
                lineAnime.stop(),
                lineAnime.destroy(),
                Observables.FinishLineAnime.next(true),
                clearTimeout(timeOut),
            ]
            , 2000);
        
    }

}