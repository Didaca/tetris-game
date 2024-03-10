import * as PIXI from 'pixi.js';
import { Matrix } from './components/cMatrix';
import { TextCenter } from './components/text/cTextCenter';
import { TextRight } from './components/text/cTextRight';
import { KeyCodes } from './enums/KeyCodes';
import { Texts } from './enums/Texts';
import { Engine } from './components/cEngine';
import { Names } from './enums/Names';
import { background, emptyTexture, tetris } from './textures/textures';
import { Numbers } from './enums/Numbers';
import { Pause } from './components/text/cPause';
import { Directions } from './enums/Directions';
import { Score } from './components/text/cScore';
import { Sounds } from './sounds/cSounds';
import { SoundsKey } from './enums/SoundsKey';
import { NextElement } from './components/elements/cNextEl';
import { ScoreTXT } from './components/text/cTextScore';
import { Next } from './components/text/cTextNext';
import { TetrisTXT } from './components/elements/cTetris';


class Game extends PIXI.Container {
    public engine: Engine;
    private sound: Sounds;
    private score: Score;
    private movesCount: number = 0;
    private gameSpeed: number = 300;
    private speedNormal: number;
    private speedtoUP: boolean = false;
    private gamePlay: boolean = true;
    private isPause: boolean = false;
    private cMatrix: Matrix;
    private intervalId: ReturnType<typeof setInterval>;
    private nextElement: NextElement;
    private tetrisText: TetrisTXT;
    private tetrisTexture: PIXI.Texture;
    private emptyTexture: PIXI.Texture;
    private pauseInfo: TextRight;
    private restartInfo: TextRight;
    private scoreInfo: ScoreTXT;
    private nextInfo: Next;
    private pause: Pause;
    private gameOver: TextCenter;

    constructor() {
        super()
        this.name = Names.GAME;
        this.speedNormal = this.gameSpeed;
        this.engine = new Engine();
        this.score = new Score();
        this.sound = new Sounds();
        this.intervalId = setInterval(() => { });
        this.emptyTexture = emptyTexture;
        this.tetrisTexture = tetris;
        this.cMatrix = new Matrix(Names.MATRIX, this.emptyTexture);
        this.nextElement = new NextElement(this.emptyTexture);
        this.tetrisText = new TetrisTXT(this.tetrisTexture);
        this.pause = new Pause(Texts.PAUSE);
        this.gameOver = new TextCenter(Texts.GAMEOVER);
        this.pauseInfo = new TextRight(Texts.PAUSEINFO);
        this.restartInfo = new TextRight(Texts.RESTART);
        this.scoreInfo = new ScoreTXT(Texts.SCORE);
        this.nextInfo = new Next(Texts.NEXT);
        window.addEventListener('keydown', this.onKeyClick.bind(this));
    }

    public init(): void {
        this.engine.init();
        this.engine.add(this);
        this.createBackgroundSprite();
        this.addTetrisLogo();
        this.cMatrix.init();
        this.addChild(this.cMatrix as any);
        this.addPauseInfo();
        this.addScoreText();
        this.addScore();
        this.addNextText();
        this.addNextElementSection();
        this.gameLoop();
    }

    // loading game background template 
    private createBackgroundSprite(): void {
        const backgroundSprite: PIXI.Sprite = new PIXI.Sprite(background);
        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = this.engine.app.screen.width / Numbers.TWO;
        backgroundSprite.y = this.engine.app.screen.height / Numbers.TWO;
        this.addChild(backgroundSprite as any);
    }

    private addTetrisLogo(): void {
        this.addChild(this.tetrisText.element as any);
    }

    // add Score text
    private addScoreText(): void {
        // to load font-family correctly
        setTimeout(() => { this.addChild(this.scoreInfo.text) }, 500)
    }

    // add Score section on the right side 
    private addScore(): void {
        this.addChild(this.score.text);
        // to load font-family correctly
        setTimeout(() => { this.score.text.updateText() }, 500)
    }

    // add Next element section on the right side 
    private addNextElementSection(): void {
        this.addChild(this.nextElement.element as any);
    }

    // switch texture with texture from next element
    private updateNextElementSection(): void {
        const texture = this.cMatrix.getNextElementTexture();
        this.nextElement.updateTexture(texture);
    }

    // add NEXT Text
    private addNextText(): void {
        // to load font-family correctly
        setTimeout(() => { this.addChild(this.nextInfo.text) }, 500)
    }

    // move element down, check for lines
    private async down(): Promise<void> {
        this.updateNextElementSection();

        if (this.cMatrix.isToMoveDown()) {
            this.cMatrix.moveDown();
            return
        }

        if (this.cMatrix.isGameOver()) {
            this.stopGame();
            this.sound.play(SoundsKey.GAMEOVER);
            return
        }

        const [lines, row] = this.cMatrix.getLines();
        if (lines.length > 0) {
            // to pass down in gameLoop
            this.isPause = true;
            await this.cMatrix.anime(lines);
            this.cMatrix.cleanLines(row, lines.length);
            this.score.updateScore(lines.length);
            this.sound.play(SoundsKey.FULLLINE);
            this.checkToIncreaseSpeed(lines.length);
            this.cMatrix.drawElement();
            this.isPause = false;
        } else {
            this.cMatrix.drawElement();

        }
    }

    // rotate element 
    private rotate(): void {
        if (this.cMatrix.isToRotate()) {
            this.cMatrix.rotate();
            this.sound.play(SoundsKey.ROTATION);
        }
    }

    // move element left 
    private left(): void {
        if (this.cMatrix.isToMoveLorR(Directions.LEFT)) {
            this.cMatrix.moveLeftOrRight(Directions.LEFT);
        }
    }

    // move element right 
    private right(): void {
        if (this.cMatrix.isToMoveLorR(Directions.RIGHT)) {
            this.cMatrix.moveLeftOrRight(Directions.RIGHT);
        }
    }

    // add Pause text section on the bottom right side 
    private addPauseInfo(): void {
        this.pauseInfo.text.alpha = 1;
        // to load font-family correctly
        setTimeout(() => {
            this.addChild(this.pauseInfo.text);
        }, 500)
    }

    // show or hide text`s 'Pause'
    private addremovePause(): void {
        this.isPause ?
            this.addChild(this.pause.text)
            : this.removeChild(this.pause.text);
    }

    // removing text`s 'Game Over' and message how to restart the Game
    private removeTextsGameOver(): void {
        this.removeChild(this.gameOver.text);
        this.removeChild(this.restartInfo.text);
    }

    // loading text`s 'Game over' and message how to restart the Game 
    private addGameOverTexts(): void {
        this.pauseInfo.text.alpha = 0;
        this.addChild(this.gameOver.text);
        this.addChild(this.restartInfo.text);
    }

    private onKeyClick(ev: KeyboardEvent): void {
        if (this.gamePlay) {
            /* stoping arrows when pause on */
            if (!this.isPause) {
                if (ev.code === KeyCodes.ARROWUP) {
                    this.rotate();
                }
                if (ev.code === KeyCodes.ARROWLEFT) {
                    this.left()
                }
                if (ev.code === KeyCodes.ARROWRIGHT) {
                    this.right();
                }
                if (ev.code === KeyCodes.ARROWDOWN) {
                    this.down();
                }
            }
            if (ev.code === KeyCodes.SPACE) {
                this.isPause = !this.isPause;
                this.addremovePause();
            }
        } else if (ev.code === KeyCodes.ENTER) {
            this.resetGame();
        }
    }

    private stopGame(): void {
        this.gamePlay = false;
        clearInterval(this.intervalId);
        this.addGameOverTexts();
    }

    private resetGame(): void {
        this.removeTextsGameOver();
        this.speedNormal = this.gameSpeed;
        this.score.resetScore();
        this.cMatrix.resetMatrix();
        this.addPauseInfo();
        this.gameLoop();
        this.gamePlay = true;
    }

    // increase speed with 5%, remove setInterval & return new setInterval 
    private increaseSpeed(): void {
        this.speedNormal -= Math.floor(this.speedNormal * 0.05);
    }

    // checking for every 20 points to increase the Speed
    private checkToIncreaseSpeed(lines: number): void {
        for (let i = 0; i < lines; i++) {
            this.movesCount++;
            if (this.movesCount % 20 === 0) {
                this.speedtoUP = true;
                this.movesCount = 0;
            }
        }
    }

    private gameLoop(): void {
        this.intervalId = setInterval(this.move.bind(this), this.speedNormal);

    }

    private move(): void {
        if (this.isPause) {
            return
        }

        if (this.speedtoUP) {
            this.increaseSpeed();
            clearInterval(this.intervalId);
            this.gameLoop();
            this.speedtoUP = false;
        }

        this.down();
    }

} // Game

function load() {
    const game = new Game();
    game.init();

    function render(): void {
        requestAnimationFrame(render);
        game.engine.fpsMeter.tick();
    } // render

    render();
} // load

window.onload = load;
