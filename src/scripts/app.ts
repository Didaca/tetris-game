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
import { Next } from './components/Next';
import { Score } from './components/text/Score';
import { NextText } from './components/text/NextText';
import { ScoreText } from './components/text/ScoreText';
import { UIContainer } from './components/UI';



class Game {
    protected tamplate: Canvas | undefined;
    protected matrix: Matrix | undefined;
    protected uiContainer: UIContainer | undefined;
    protected intervalId: ReturnType<typeof setInterval>;
    protected loadGameIntervalId: ReturnType<typeof setInterval>;
    protected element: any;
    protected buttonL: any;
    protected buttonR: any;
    protected buttonRotate: any;
    protected nextCount: any;
    protected nextText: any;
    protected scoreText: any;
    protected score: Score;
    protected _stepSpeed: number = 30;
    protected _timeForAssets: number = 100;

    constructor() {
        this.score = new Score();
        this.intervalId = setInterval(() => { });
        this.loadGameIntervalId = setInterval(this.afterTexturesInit.bind(this), this._timeForAssets);
    }

    protected afterTexturesInit(): void {
        if (Textures.complited) {
            this.init();
            clearInterval(this.loadGameIntervalId);
        }
    }

    private init(): void {
        this.setResolves();
        if (this.tamplate) {
            this.loadGameContainers(this.tamplate);
            this.matrix = new Matrix(this.tamplate);
            this.element = this.matrix.element;
            this.showNextElement();
            this.updateButtons();
            this.gameLoop();
        }
    }

    private gameLoop(): void {
        this.intervalId = setInterval(this.move.bind(this), this._stepSpeed);

    }

    private move(): void {
        
        if (this.element.stoped) {

            if (this.matrix?.isGameOver()) {
                clearInterval(this.intervalId);
                Log.log('GAME OVER!');
                return;
            }
            
            this.matrix?.cleanLines();
            this.updateScore();
            this.matrix?.drawElement();
            this.showNextElement();
            this.element = this.matrix?.element;
            this.updateButtons();
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
        this.uiContainer = container.resolve(UIContainer);
        this.buttonL = container.resolve(ButtonLeft);
        this.buttonR = container.resolve(ButtonRight);
        this.buttonRotate = container.resolve(ButtonRotate);
        this.nextText = container.resolve(NextText);
        this.scoreText = container.resolve(ScoreText);
        this.nextCount = container.resolve(Next);
    }

    private loadGameContainers(game: Canvas): void {
        game.addContainer(new Logo());
        this.uiContainer?.addChild(this.buttonL);
        this.uiContainer?.addChild(this.buttonR);
        this.uiContainer?.addChild(this.buttonRotate);
        game.addContainer(this.uiContainer);
        game.addContainer(this.nextText);
        game.addContainer(this.nextCount);
        game.addContainer(this.scoreText);
        game.addContainer(this.score.text);
    }

    private showNextElement(): void {
        (this.nextCount.children?.at(0) as any).texture = this.matrix?.getnextElementImage();
    }

    private updateScore(): void {
        (this.matrix?.linesCount as number) > 0 ? this.score.updateScore(this.matrix?.linesCount as number) : this.score.updateScore(0);
        this.matrix?.setLinesCount(0);
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
