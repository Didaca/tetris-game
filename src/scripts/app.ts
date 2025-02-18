import 'reflect-metadata';
import { Canvas } from './components/Canvas';
import { Matrix } from './components/Matrix';
import Textures from './textures/Texture';
import Log from './components/Log';
import { Logo } from './components/Logo';
import { container } from 'tsyringe';
import { ButtonLeft } from './components/ButtonLeft';
import { ButtonRight } from './components/ButtonRight';
import { ButtonRotate } from './components/ButtonRotate';



class Game {
    protected tamplate: Canvas | undefined;
    protected matrix: Matrix | undefined;
    protected intervalId: ReturnType<typeof setInterval>;
    protected loadGameIntervalId: ReturnType<typeof setInterval>;
    protected element: any;
    protected buttonL: any;
    protected buttonR: any;
    protected buttonRotate: any;
    protected _stepSpeed: number = 500;
    protected _timeForAssets: number = 100;

    constructor() {
        this.intervalId = setInterval(() => { });
        this.loadGameIntervalId = setInterval(this.afterTexturesInit.bind(this), this._timeForAssets);
        // window.addEventListener('click', this.left.bind(this));

    }

    protected afterTexturesInit(): void {
        if (Textures.complited) {
            this.init();
            clearInterval(this.loadGameIntervalId);
        }
    }

    private init(): void {
        Log.log('ASSETS LOADED!')
        this.setResolves();
        if (this.tamplate) {
            this.loadGameContainers(this.tamplate);
            this.matrix = new Matrix(this.tamplate);
            this.element = this.matrix.element;
            this.updateButtons();
            this.gameLoop();
        }
    }

    private gameLoop(): void {
        this.intervalId = setInterval(this.move.bind(this), this._stepSpeed);

    }

    private move(): void {
        if (this.element.stoped) {
            this.matrix?.drawElement();
            this.element = this.matrix?.element;
            this.updateButtons();
        }

        if (!this.element.isDrawn) {
            Log.log('GAME OVER!');
            clearInterval(this.intervalId);
            return;
        }

        this.element.down();
    }

    private updateButtons(): void {
        this.buttonL.addElement(this.element);
        this.buttonR.addElement(this.element);
        this.buttonRotate.addElement(this.element);
    }

    private setResolves(): void {
        this.tamplate = container.resolve(Canvas);
        this.buttonL = container.resolve(ButtonLeft);
        this.buttonR = container.resolve(ButtonRight);
        this.buttonRotate = container.resolve(ButtonRotate);
    }

    private loadGameContainers(game: Canvas): void {
        game.addContainer(new Logo());
        game.addContainer(this.buttonL);
        game.addContainer(this.buttonR);
        game.addContainer(this.buttonRotate);
    }


} // Game

function load() {
    new Game();

    function render(): void {
        requestAnimationFrame(render);

    } // render

    render();
} // load

window.onload = load;
