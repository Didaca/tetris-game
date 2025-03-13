import { BaseElement } from '../baseComponents/BaseElement';
import Textures from '../textures/Texture';
import { Matrix } from '../components/Matrix';


export class Cube extends BaseElement {
    protected _base: any;

    constructor(private matrix: Matrix) {
        super()
        this._base = matrix.baseT;
        this._texture = Textures.getTexture('CUBE');
        this.image = Textures.getTexture('CUBE_IMAGE');
        this._config.elementHeight = 2;
        this._config.elementLenght = this._config.elementHeight;
    }

    public get stoped(): boolean {
        return this._config.stoped;
    }

    public draw(): void {
        for (let row = 0; row < this._config.elementHeight; row++) {

            (this.matrix.children[row].children?.at(this._config.startPosition) as any).texture = this._texture;
            (this.matrix.children[row].children?.at(this._config.startPosition + 1) as any).texture = this._texture;

            this.setCoordinates(row, this._config.startPosition);

        }
    }

    public down(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (!this.isMoveDown(row, startDrawPoint)) {
            this._config.stoped = true;
            return;
        }

        this.clean(row, startDrawPoint);
        this.reDrawDown(row, startDrawPoint);
        this.setDownCoordinates();
        // [28, 8]
        // console.log(this.coordinates)
    }

    public left(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (this._config.stoped) {
            return;
        }

        if (
            (startDrawPoint === 0) ||
            !this.isMoveLeft(row, startDrawPoint)
        ) {
            return;
        }

        this.clean(row, startDrawPoint);
        this.reDrawLeft(row, startDrawPoint);
        this.setLeftCoordinates();
    }

    public right(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (this._config.stoped) {
            return;
        }

        if (
            (startDrawPoint === this.matrix.matrixCol - this._config.elementLenght) ||
            !this.isMoveRight(row, startDrawPoint)
        ) {
            return;
        }

        this.clean(row, startDrawPoint);
        this.reDrawRight(row, startDrawPoint + 1);
        this.setRightCoordinates();
    }

    // private methods

    private isMoveDown(r: number, point: number): boolean {
        let go: boolean = true;
        if (r === this.matrix.matrixRow - 1) {
            go = false;
            return go;
        }
        if ((this.matrix.children[r + 1] as any).children[point].texture !== this._base ||
            (this.matrix.children[r + 1] as any).children[point + 1].texture !== this._base) {
            go = false;
            return go;
        }
        return go;
    }

    private isMoveLeft(r: number, point: number): boolean {
        let go: boolean = true;
        if ((this.matrix.children[r] as any).children[point - 1].texture !== this._base ||
            (this.matrix.children[r - 1] as any).children[point - 1].texture !== this._base) {
            go = false;
        }
        return go;
    }

    private isMoveRight(r: number, point: number): boolean {
        let go: boolean = true;
        if ((this.matrix.children[r] as any).children[point + this._config.elementLenght].texture !== this._base ||
            (this.matrix.children[r - 1] as any).children[point + this._config.elementLenght].texture !== this._base) {
            go = false;
        }
        return go;
    }

    private clean(r: number, point: number): void {
        for (let i = 0; i < this._config.elementLenght; i++) {
            (this.matrix.children[r - i].children?.at(point) as any).texture = this._base;
            (this.matrix.children[r - i].children?.at(point + 1) as any).texture = this._base;

        }
    }

    private reDrawDown(r: number, point: number): void {
        for (let i = 0; i < this._config.elementLenght; i++) {
            (this.matrix.children[r + i].children?.at(point) as any).texture = this._texture;
            (this.matrix.children[r + i].children?.at(point + 1) as any).texture = this._texture;

        }
    }

    private reDrawLeft(r: number, point: number): void {
        for (let i = 0; i < this._config.elementLenght; i++) {
            (this.matrix.children[r].children?.at(point - i) as any).texture = this._texture;
            (this.matrix.children[r - 1].children?.at(point - i) as any).texture = this._texture;

        }
    }

    private reDrawRight(r: number, point: number): void {
        for (let i = 0; i < this._config.elementLenght; i++) {
            (this.matrix.children[r].children?.at(point + i) as any).texture = this._texture;
            (this.matrix.children[r - 1].children?.at(point + i) as any).texture = this._texture;

        }
    }



}