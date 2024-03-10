import * as PIXI from 'pixi.js';

export interface GlobalThis {
    __PIXI_APP__: PIXI.Application<HTMLCanvasElement>
}