import { BaseElement } from "../baseComponents/BaseElement";

export interface IMatrix {
    matrixRow: number;
    matrixCol: number;
    firstVisiblyRow: number;
    spriteSize: number;
    name: string;
    arrayElements: Array<BaseElement>;

    get element(): any;
    
    get baseT(): any;
    
    isGameOver(): boolean;

    cleanLines(): void;

    drawElement(): void
}