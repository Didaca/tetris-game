import 'reflect-metadata';
import { Canvas } from './components/Canvas';
import { Matrix } from './components/Matrix';
import Textures from './textures/Texture';
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
    protected loadGameIntervalId: ReturnType<typeof setInterval>;
    protected element: any;
    protected buttonL: any;
    protected buttonR: any;
    protected buttonRotate: any;
    protected nextElementViewport: any;
    protected nextText: any;
    protected scoreText: any;
    protected score: Score | undefined;
    protected _stepSpeed: number = 200;
    protected _timeForAssets: number = 100;



    constructor() {
        this.engineGameIntervalId = setInterval(() => { });
        this.loadGameIntervalId = setInterval(this.afterTexturesInit.bind(this), this._timeForAssets);
        Observables.UpdateScore.subscribe((v: number) => { this.score?.updateScore(v) });
        Observables.ResetLinesCount.subscribe((v: number) => { this.matrix?.setLinesCount(v) });
        Observables.FinishLinesReplaced.subscribe(this.afterLineAnime.bind(this));
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
        this.engineGameIntervalId = setInterval(this.move.bind(this), this._stepSpeed);

    }

    private down(): void {
        this.showNextElement();

        console.log(Observables.InAnime.value)

        if (!this.element.stoped) {
            this.element.down();
            return;
        }

        if (this.matrix?.isGameOver()) {
            clearInterval(this.engineGameIntervalId);
            Log.log('GAME OVER!');
            return;
        }

        if (this.matrix?.hasLines()) {
            Observables.InAnime.next(true);
            this.matrix?.cleanLines();
        }
        if (!Observables.InAnime.value) {
            this.matrix?.drawElement();
            this.element = this.matrix?.element;
            this.updateButtons();
        }

    }

    private move(): void {
        if (Observables.InAnime.value) {
            return;
        }
        this.down();
    }

    private afterLineAnime(): void {
        if (Observables.FinishLinesReplaced.value) {
            this.updateScore();
            this.matrix?.drawElement();
            this.element = this.matrix?.element;
            this.updateButtons();
            Observables.FinishLinesReplaced.next(false);
        }
    }


    private updateButtons(): void {
        this.buttonL.addElement(this.element);
        this.buttonR.addElement(this.element);
        this.buttonRotate.addElement(this.element);
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
        Observables.UpdateScore.next((this.matrix?.linesCount) as number);
        Observables.ResetLinesCount.next(Numbers.ZERO);
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
