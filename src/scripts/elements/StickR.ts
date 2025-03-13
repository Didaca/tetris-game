import { BaseElement } from '../baseComponents/BaseElement';
import Textures from '../textures/Texture';
import { Matrix } from '../components/Matrix';

export class StickR extends BaseElement {
    protected _base: any;

    constructor(private matrix: Matrix) {
        super()
        this._base = matrix.baseT;
        this._texture = Textures.getTexture('STICK_R');
        this.image = Textures.getTexture('STICK_R_IMAGE');
    }

    public get stoped(): boolean {
        return this._config.stoped;
    }

    public draw(): void {
        for (let row = 0; row < this._config.elementHeight; row++) {

            if (row === 0) {
                (this.matrix.children[row].children?.at(this._config.startPosition + 1) as any).texture = this._texture;
                continue;
            }

            (this.matrix.children[row].children?.at(this._config.startPosition - 1) as any).texture = this._texture;
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

        if (!this.isMoveLeft(row, startDrawPoint)) {
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

        switch (this._config.position) {
            case 1:
                if (r === this.matrix.matrixRow - 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r + 1] as any).children[point].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point - 1].texture !== this._base
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
                if ((this.matrix.children[r + 2] as any).children[point].texture !== this._base ||
                    (this.matrix.children[r + 2] as any).children[point + 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 3:
                if (r === this.matrix.matrixRow - 2) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r + 1] as any).children[point].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r + 2] as any).children[point - 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 4:
                if (r === this.matrix.matrixRow - 2) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r + 2] as any).children[point].texture !== this._base
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

        switch (this._config.position) {
            case 1:
                if (point === 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point - 2].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point].texture !== this._base
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
                if ((this.matrix.children[r] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point - 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point - 1].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 3:
                if (point === 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point - 2].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point - 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 4:
                if (point === 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r - 1] as any).children[point - 2].texture !== this._base ||
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
        switch (this._config.position) {
            case 1:
                if (point === this.matrix.matrixCol - this._config.elementHeight) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point + 2].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point + 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 2:
                if (point === this.matrix.matrixCol - this._config.elementHeight) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r - 1] as any).children[point + 1].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point + 2].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 3:
                if (point === this.matrix.matrixCol - this._config.elementHeight) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r] as any).children[point + 2].texture !== this._base ||
                    (this.matrix.children[r + 1] as any).children[point].texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 4:
                if (point === this.matrix.matrixCol - 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r - 1] as any).children[point + 1].texture !== this._base ||
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
        switch (this._config.position) {
            case 1:
                if (r === this.matrix.matrixRow - 1 || r < 3) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r + 1].children?.at(point) as any).texture !== this._base ||
                    (this.matrix.children[r + 1].children?.at(point + 1) as any).texture !== this._base ||
                    (this.matrix.children[r - 1].children?.at(point) as any).texture !== this._base
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
                if ((this.matrix.children[r].children?.at(point - 1) as any).texture !== this._base ||
                    (this.matrix.children[r].children?.at(point + 1) as any).texture !== this._base ||
                    (this.matrix.children[r + 1].children?.at(point - 1) as any).texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 3:
                if ((this.matrix.children[r + 1].children?.at(point) as any).texture !== this._base ||
                    (this.matrix.children[r - 1].children?.at(point) as any).texture !== this._base ||
                    (this.matrix.children[r - 1].children?.at(point - 1) as any).texture !== this._base
                ) {
                    go = false;
                    return go;
                }
                break;
            case 4:
                if (point === this.matrix.matrixCol - 1) {
                    go = false;
                    return go;
                }
                if ((this.matrix.children[r].children?.at(point - 1) as any).texture !== this._base ||
                    (this.matrix.children[r].children?.at(point + 1) as any).texture !== this._base ||
                    (this.matrix.children[r - 1].children?.at(point + 1) as any).texture !== this._base
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
        (this.matrix.children[r].children?.at(point) as any).texture = this._base;

        switch (this._config.position) {
            case 1:
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                break;
            case 2:
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._base;
                break;
            case 3:
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._base;
                break;
            case 4:
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._base;
                break;
            default:
                break;
        }
    }

    private reDrawDown(r: number, point: number): void {
        switch (this._config.position) {
            case 1:
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                break;
            case 2:
                (this.matrix.children[r].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 2].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 2].children?.at(point + 1) as any).texture = this._texture;
                break;
            case 3:
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 2].children?.at(point - 1) as any).texture = this._texture;
                break;
            case 4:
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 2].children?.at(point) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawLeft(r: number, point: number): void {
        switch (this._config.position) {
            case 1:
                for (let i = 0; i < this._config.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point - i) as any).texture = this._texture;

                }
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                break;
            case 2:
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                break;
            case 3:
                for (let i = 0; i < this._config.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point - i) as any).texture = this._texture;

                }
                (this.matrix.children[r + 1].children?.at(point - 2) as any).texture = this._texture;
                break;
            case 4:
                (this.matrix.children[r - 1].children?.at(point - 2) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                break;
            default:
                break;
        }
    }

    private reDrawRight(r: number, point: number): void {
        switch (this._config.position) {
            case 1:
                for (let i = 0; i < this._config.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point + i) as any).texture = this._texture;

                }
                (this.matrix.children[r - 1].children?.at(point + 2) as any).texture = this._texture;
                break;
            case 2:
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 2) as any).texture = this._texture;
                break;
            case 3:
                for (let i = 0; i < this._config.elementLenght; i++) {
                    (this.matrix.children[r].children?.at(point + i) as any).texture = this._texture;

                }
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                break;
            case 4:
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                break;

            default:
                break;
        }
    }

    private reDrawRotation(r: number, point: number): void {
        switch (this._config.position) {
            case 1:
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._base;

                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                this._config.position = 2;
                break;
            case 2:
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;

                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._texture;
                this._config.position = 3;
                break;
            case 3:
                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._base;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._base;
                (this.matrix.children[r + 1].children?.at(point - 1) as any).texture = this._base;

                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._texture;
                this._config.position = 4;
                break;
            case 4:
                (this.matrix.children[r + 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point) as any).texture = this._base;
                (this.matrix.children[r - 1].children?.at(point - 1) as any).texture = this._base;

                (this.matrix.children[r].children?.at(point - 1) as any).texture = this._texture;
                (this.matrix.children[r].children?.at(point + 1) as any).texture = this._texture;
                (this.matrix.children[r - 1].children?.at(point + 1) as any).texture = this._texture;
                this._config.position = 1;
                break;
            default:
                break;
        }
    }
}
