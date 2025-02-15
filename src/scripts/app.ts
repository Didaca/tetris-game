import 'reflect-metadata';
import {Canvas} from './components/Canvas';
import { Matrix } from './components/Matrix';
import Textures from './textures/Texture';
import Log from './components/Log';
import { Logo } from './components/Logo';
import { container } from 'tsyringe';



class Game {
    protected tamplate: Canvas | undefined;
    protected matrix: Matrix | undefined;
    protected intervalId: ReturnType<typeof setInterval>;
    protected loadGameIntervalId: ReturnType<typeof setInterval>;
    protected element: any;
    protected _stepSpeed: number = 500;
    protected _timeForAssets: number = 100;

    constructor() {
        // this.Textures = container.resolve(Textures);
        this.intervalId = setInterval(() => { });
        this.loadGameIntervalId = setInterval(this.afterTexturesInit.bind(this), this._timeForAssets);
        window.addEventListener('click', this.left.bind(this));
               
    }

    protected afterTexturesInit(): void {
        if(Textures.complited) {
            this.init();
            clearInterval(this.loadGameIntervalId);
        }
    }

    protected init(): void {
        Log.log('ASSETS LOADED!')
        this.tamplate = container.resolve(Canvas);
        this.tamplate.addContainer(new Logo());
        this.matrix = new Matrix(this.tamplate);
        this.element = this.matrix.element;
        this.gameLoop(); 
    }

    private gameLoop(): void {
        this.intervalId = setInterval(this.move.bind(this), this._stepSpeed);

    }

    private move(): void {
        if(this.element.stoped) {
            this.matrix?.drawElement();
            this.element = this.matrix?.element;
        }  

        if(!this.element.isDrawn) {
            Log.log('GAME OVER!');
            clearInterval(this.intervalId);
            return;
        }

        this.element.down();
    }

    private left():void {
        this.element.left();
    }

    private right(): void {
        this.element.right();
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
