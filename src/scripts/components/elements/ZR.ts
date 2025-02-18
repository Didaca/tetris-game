import { BaseElement } from '../baseComponents/BaseElement';
import Textures from '../../textures/Texture';
import { Matrix } from '../Matrix';


export class ZR extends BaseElement {
    readonly elementHeight: number = 2;
    readonly elementLenght: number = 3;
    public image: any;
    protected _texture: any;
    protected _base: any;
    protected _boardPlate: Matrix;

    constructor(board: Matrix) {
        super()
        this._boardPlate = board;
        this._base = board.baseT;
        this._texture = Textures.getTexture('Z_R');
        this.image = Textures.getTexture('Z_R_IMAGE');
        this.coordinates = [];
    }

    public get stoped(): boolean {
        return this._stoped;
    }

    public draw(): void {
        for (let row = 0; row < this.elementHeight; row++) {

            if (!this._boardPlate.toGO()) {
                this.isDrawn = false;
                return;
            }

            if (row === 0) {
                (this._boardPlate.children[row].children?.at(this._startPosition) as any).texture = this._texture;
                (this._boardPlate.children[row].children?.at(this._startPosition + 1) as any).texture = this._texture;
                continue;
            }

            (this._boardPlate.children[row].children?.at(this._startPosition) as any).texture = this._texture;
            (this._boardPlate.children[row].children?.at(this._startPosition - 1) as any).texture = this._texture;

            this.setCoordinates(row, this._startPosition);

        }

    }

    public down(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (!this.isMoveDown(row, startDrawPoint)) {
            this._stoped = true;
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

        if (this._stoped) {
            return;
        }

        if (!this.isMoveLeft(row, startDrawPoint)) {
            return;
        }

        this.clean(row, startDrawPoint);
        this.reDrawLeft(row, startDrawPoint);
        this.setLeftCoordinates();
    }

    public right(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (this._stoped) {
            return;
        }

        if (!this.isMoveRight(row, startDrawPoint)) {
            return;
        }

        this.clean(row, startDrawPoint);
        this.reDrawRight(row, startDrawPoint);
        this.setRightCoordinates();
    }

    public rotate(): void {
        const [row, startDrawPoint]: number[] = this.coordinates;

        if (!this.isRotate(row, startDrawPoint)) {
            return;
        }
        this.reDrawRotation(row, startDrawPoint);

    }

    private isMoveDown(r: number, point: number): boolean {
        let go: boolean = true;

        switch (this._position) {
            case 1:
                if (r === this._boardPlate.matrixRow - 1) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r + 1] as any).children[point].texture !== this._base ||
                    (this._boardPlate.children[r + 1] as any).children[point - 1].texture !== this._base ||
                    (this._boardPlate.children[r] as any).children[point + 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (r === this._boardPlate.matrixRow - 2) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r + 1] as any).children[point].texture !== this._base ||
                    (this._boardPlate.children[r + 2] as any).children[point + 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            default:
                break;
        }
        return go;
    }

    private isMoveLeft(r: number, point: number): boolean {
        let go: boolean = true;

        switch (this._position) {
            case 1:
                if (point === 1) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r] as any).children[point - 2].texture !== this._base ||
                    (this._boardPlate.children[r - 1] as any).children[point - 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point === 0) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r] as any).children[point - 1].texture !== this._base ||
                    (this._boardPlate.children[r - 1] as any).children[point - 1].texture !== this._base ||
                    (this._boardPlate.children[r + 1] as any).children[point].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            default:
                break;
        }
        return go;
    }

    private isMoveRight(r: number, point: number): boolean {
        let go: boolean = true;
        const corner: number = this._boardPlate.matrixCol - this.elementHeight;
        switch (this._position) {
            case 1:
                if (point === corner) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r] as any).children[point + 1].texture !== this._base ||
                    (this._boardPlate.children[r - 1] as any).children[point + 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point === corner) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r] as any).children[point + 2].texture !== this._base ||
                    (this._boardPlate.children[r - 1] as any).children[point + 1].texture !== this._base ||
                    (this._boardPlate.children[r + 1] as any).children[point + 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            default:
                break;
        }
        return go;
    }

    private isRotate(r: number, point: number): boolean {
        let go: boolean = true;
        switch (this._position) {
            case 1:
                if (r === this._boardPlate.matrixRow - 1) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r].children?.at(point + 1) as any).texture !== this._base ||
                    (this._boardPlate.children[r + 1].children?.at(point + 1) as any).texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point === 0) {
                    go = false;
                    return go;
                }
                if ((this._boardPlate.children[r].children?.at(point - 1) as any).texture !== this._base ||
                    (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            default:
                break;
        }
        return go;
    }

    private clean(r: number, point: number): void {
        (this._boardPlate.children[r].children?.at(point) as any).texture = this._base;

        switch (this._position) {
            case 1:
                (this._boardPlate.children[r].children?.at(point - 1) as any).texture = this._base;
                (this._boardPlate.children[r - 1].children?.at(point) as any).texture = this._base;
                (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture = this._base;
                break;
            case 2:
                (this._boardPlate.children[r - 1].children?.at(point) as any).texture = this._base;
                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._base;
                (this._boardPlate.children[r + 1].children?.at(point + 1) as any).texture = this._base;
                break;
            default:
                break;
        }
    }

    private reDrawDown(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this._boardPlate.children[r].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                break;
            case 2:
                (this._boardPlate.children[r].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r + 2].children?.at(point + 1) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawLeft(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this._boardPlate.children[r - 1].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point - 2) as any).texture = this._texture;
                break;
            case 2:
                (this._boardPlate.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawRight(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r - 1].children?.at(point + 2) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._texture;
                break;
            case 2:
                (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r].children?.at(point + 2) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point + 2) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawRotation(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this._boardPlate.children[r].children?.at(point - 1) as any).texture = this._base;
                (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture = this._base;

                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this._boardPlate.children[r + 1].children?.at(point + 1) as any).texture = this._texture;

                this._position = 2;
                break;
            case 2:
                (this._boardPlate.children[r].children?.at(point + 1) as any).texture = this._base;
                (this._boardPlate.children[r + 1].children?.at(point + 1) as any).texture = this._base;

                (this._boardPlate.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this._boardPlate.children[r - 1].children?.at(point + 1) as any).texture = this._texture;

                this._position = 1;
                break;
            default:
                break;
        }
    }

}