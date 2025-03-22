import 'reflect-metadata';
import { Canvas } from './components/Canvas';
import { Matrix } from './components/Matrix';
import Log from './components/Log';
import { Logo } from './components/Logo';
import { ButtonLeft } from './components/ButtonLeft';
import { ButtonRight } from './components/ButtonRight';
import { ButtonRotate } from './components/ButtonRotate';
import { Next } from './components/Next';
import { Score } from './text/Score';
import { NextText } from './text/NextText';
import { ScoreText } from './text/ScoreText';
import { UIContainer } from './components/UI';
import { container } from 'tsyringe';
import { Numbers } from './enums/Numbers';
import Observables from './components/Observables';



class Game {
    protected tamplate: Canvas | undefined;
    protected matrix: Matrix | undefined;
    protected logo: Logo | undefined;
    protected uiContainer: UIContainer | undefined;
    protected engineGameIntervalId: ReturnType<typeof setInterval>;
    protected buttonL: any;
    protected buttonR: any;
    protected buttonRotate: any;
    protected nextElementViewport: any;
    protected nextText: any;
    protected scoreText: any;
    protected score: Score | undefined;
    protected _stepSpeed: number = 150;



    constructor() {
        this.engineGameIntervalId = setInterval(() => { });
        Observables.LoadAssets.subscribe((b: boolean) => { this.afterTexturesInit(b) });
        Observables.LoadUpdateScore.subscribe(() => {this.updateScore()});
        Observables.UpdateScore.subscribe((v: number) => { this.score?.updateScore(v) });
        Observables.Pause.subscribe((y) => {this.setPauseGame(y)});
    }

    protected afterTexturesInit(gameLoaded: boolean): void {
        if (gameLoaded) {
            this.init();
        }
    }

    private init(): void {
        this.setResolves();
        if (this.tamplate) {
            this.loadGameContainers(this.tamplate);
            this.matrix = new Matrix(this.tamplate);
            this.showNextElement();
            this.updateButtons();
            this.gameLoop();
        }
    }

    private gameLoop(): void {
        this.engineGameIntervalId = setInterval(this.move.bind(this), this._stepSpeed);

    }

    private setPauseGame(y: boolean): void {
        y ? clearInterval(this.engineGameIntervalId) : this.engineGameIntervalId = setInterval(this.move.bind(this), this._stepSpeed);
    }

    private move(): void {
        this.down();
    }

    private down(): void {
        this.showNextElement();

        if (!this.matrix?.element.stoped) {
            this.matrix?.element.down();
            return;
        }

        if (this.matrix.isGameOver()) {
            clearInterval(this.engineGameIntervalId);
            Log.log('GAME OVER!');
            return;
        }

        if (this.matrix.hasLines()) {
            Observables.Pause.next(true);
            this.matrix.cleanLines();
            // const cleanPause = setTimeout(() => {
            //     [
            //         this.updateScore(),
            //         Observables.Pause.next(false),
            //         clearTimeout(cleanPause),
            //     ]
            // }, Observables.AnimationTime.value * this.matrix.linesCount);
        } else {
            this.matrix.drawElement();
            this.updateButtons();
        }

    }

    private updateButtons(): void {
        this.buttonL.addElement(this.matrix?.element);
        this.buttonR.addElement(this.matrix?.element);
        this.buttonRotate.addElement(this.matrix?.element);
    }

    private setResolves(): void {
        this.tamplate = container.resolve(Canvas);
        this.logo = container.resolve(Logo);
        this.uiContainer = container.resolve(UIContainer);
        this.buttonL = container.resolve(ButtonLeft);
        this.buttonR = container.resolve(ButtonRight);
        this.buttonRotate = container.resolve(ButtonRotate);
        this.nextText = container.resolve(NextText);
        this.score = container.resolve(Score);
        this.scoreText = container.resolve(ScoreText);
        this.nextElementViewport = container.resolve(Next);
    }

    private loadGameContainers(game: Canvas): void {
        game.addContainer(this.logo);
        this.uiContainer?.addChild(this.buttonL);
        this.uiContainer?.addChild(this.buttonR);
        this.uiContainer?.addChild(this.buttonRotate);
        game.addContainer(this.uiContainer);
        game.addContainer(this.nextText);
        game.addContainer(this.nextElementViewport);
        game.addContainer(this.scoreText);
        game.addContainer(this.score?.text);
    }

    private showNextElement(): void {
        (this.nextElementViewport.children?.at(0) as any).texture = this.matrix?.getnextElementImage();
    }

    private updateScore(): void {
        Observables.UpdateScore.next((Observables.LinesCount.value) as number);
        Observables.LinesCount.next(Numbers.ZERO);
        Observables.Pause.next(false);
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
