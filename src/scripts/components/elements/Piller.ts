import { BaseElement } from '../baseComponents/BaseElement';
import Textures from '../../textures/Texture';
import { Matrix } from '../Matrix';



export class Piller extends BaseElement {
    readonly elementHeight: number = 1;
    readonly elementLenght: number = 4;
    public image: any;
    protected _startPosition: number = 7;
    protected _coHorizontalPosition: number = 0; // 0/1
    protected _coVerticalPosition: string = 'C'; // L/C/R/CC
    protected _texture: any;
    protected _base: any;

    constructor(private matrix: Matrix) {
        super()
        this._base = this.matrix.baseT;
        this._texture = Textures.getTexture('PILLER');
        this.image = Textures.getTexture('PILLER_IMAGE');
        this.coordinates = [];
    }

    public get stoped(): boolean {
        return this._stoped;
    }

    public draw(): void {
        const firstRowToDraw: number = 1;
        for (let row = 0; row < this.elementLenght; row++) {

            if (!this.matrix.toGO()) {
                this.isDrawn = false;
                return;
            }

            (this.matrix.children[firstRowToDraw].children?.at(this._startPosition + row) as any).texture = this._texture;

        }
        this.setCoordinates(firstRowToDraw, this._startPosition + 1);

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
                if (r === this.matrix.matrixRow - 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r + 1] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (r === this.matrix.matrixRow - 2) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r + 2] as any).children[point].texture !== this._base) {
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
                if ((this.matrix.children[r] as any).children[point - 2].texture !== this._base
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
                if ((this.matrix.children[r - 2] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point - 1].texture !== this._base
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
        switch (this._position) {
            case 1:
                if (point === this.matrix.matrixCol - 3) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point + 3].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point === this.matrix.matrixCol - 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r - 2] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 1].texture !== this._base
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
                if (r < 4) {
                    go = false;
                    return go;
                }
                if (r <= this.matrix.matrixRow - 2) {
                    if (this.checkForCoHorizontalZeroPosition(r, point)) {
                        return go;
                    }
                    if (this.checkForCoHorizontalOnePosition(r, point)) {
                        this.setCoHorizontalPozition();
                        return go;
                    }
                    go = false;
                    return go;

                }
                if (r === this.matrix.matrixRow - 1) {
                    if (this.checkForCoHorizontalOnePosition(r, point)) {
                        this.setCoHorizontalPozition();
                        return go;
                    }
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point > 0 && point < this.matrix.matrixCol - 2) {
                    if (this.checkForCVPosition(r, point)) {
                        return go;
                    }
                    if (this.checkForLVPosition(r, point)) {
                        this.setLVPosition();
                        return go;
                    }
                    if (this.checkForRVPosition(r, point)) {
                        this.setRVPosition();
                        return go;
                    }
                    go = false;
                    return go;
                }
                if (point === 0) {
                    if (this.checkForLVPosition(r, point)) {
                        this.setLVPosition();
                        return go;
                    }
                    go = false;
                    return go;
                }
                if (point === this.matrix.matrixCol - 2) {
                    if (this.checkForCCVPosition(r, point)) {
                        this.setCCVPosition();
                        return go;
                    }
                    go = false;
                    return go;
                }
                if (point === this.matrix.matrixCol - 1) {
                    if (this.checkForRVPosition(r, point)) {
                        this.setRVPosition();
                        return go;
                    }
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
        switch (this._position) {
            case 1:
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 2) as any).texture = this._base;
                break;
            case 2:
                (this.matrix.children[r - 2].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;
                break;
            default:
                break;
        }
    }

    private reDrawDown(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 2) as any).texture = this._texture;
                break;
            case 2:
                (this.matrix.children[r + 2].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawLeft(r: number, point: number): void {
        switch (this._position) {
            case 1:
                point -= 2;
                for (let i = 0; i < this.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point + i) as any).texture = this._texture;
                }
                break;
            case 2:
                (this.matrix.children[r - 2].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawRight(r: number, point: number): void {
        switch (this._position) {
            case 1:
                for (let i = 0; i < this.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point + i) as any).texture = this._texture;
                }
                break;
            case 2:
                (this.matrix.children[r - 2].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawRotation(r: number, point: number): void {
        switch (this._position) {
            case 1:
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 2) as any).texture = this._base;
                if (this._coHorizontalPosition === 0) {
                    (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                    (this.matrix.children[r - 2].children?.at(point) as any).texture = this._texture;
                    (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                    this._position = 2;
                    break;
                }

                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 2].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 3].children?.at(point) as any).texture = this._texture;
                this.setUpCoordinates();
                this.setCoHorizontalPozition();
                this._position = 2;
                break;
            case 2:
                (this.matrix.children[r - 2].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;

                switch (this._coVerticalPosition) {
                    case 'C':
                        (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point + 2) as any).texture = this._texture;
                        this._position = 1;
                        break;
                    case 'L':
                        (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point + 2) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point + 3) as any).texture = this._texture;
                        this.setRightCoordinates();
                        this._position = 1;
                        this.setCVPosition();
                        break;
                    case 'R':
                        (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point - 2) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point - 3) as any).texture = this._texture;
                        this.setLeftCoordinates();
                        this.setLeftCoordinates();
                        this._position = 1;
                        this.setCVPosition();
                        break;
                    case 'CC':
                        (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                        (this.matrix.children[r].children?.at(point - 2) as any).texture = this._texture;
                        this.setLeftCoordinates();
                        this._position = 1;
                        this.setCVPosition();
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }

    // horizontal position

    private setCoHorizontalPozition(): void {
        if (this._coHorizontalPosition === 0) {
            this._coHorizontalPosition = 1
        } else {
            this._coHorizontalPosition = 0;
        }
    }

    private checkForCoHorizontalZeroPosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r - 2].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r - 1].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r + 1].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

    private checkForCoHorizontalOnePosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r - 3].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r - 2].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r - 1].children?.at(point) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

    // vertical position

    private setLVPosition(): void {
        this._coVerticalPosition = 'L';
    }

    private setRVPosition(): void {
        this._coVerticalPosition = 'R';
    }

    private setCVPosition(): void {
        this._coVerticalPosition = 'C';
    }

    private setCCVPosition(): void {
        this._coVerticalPosition = 'CC';
    }

    private checkForLVPosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r].children?.at(point + 3) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point + 2) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point + 1) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

    private checkForRVPosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r].children?.at(point - 1) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point - 2) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point - 3) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

    private checkForCVPosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r].children?.at(point - 1) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point + 1) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point + 2) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

    private checkForCCVPosition(r: number, point: number): boolean {
        let count: number = 0;
        (this.matrix.children[r].children?.at(point + 1) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point - 1) as any).texture === this._base ? count += 1 : count += 0;
        (this.matrix.children[r].children?.at(point - 2) as any).texture === this._base ? count += 1 : count += 0;

        return (count === 3);
    }

}
