import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Matrix } from './Matrix';


export default class AnimationsGSAP {

   public static async oddLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        await gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        })
            .from(line, {
                y: -200,
                stagger: {
                    amount: 2,
                    from: 'random',
                    ease: 'power1.easeInOut',
                },
            })
    }

    public static async evenLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        await gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        })
            .from(line, {
                x: 800,
                stagger: {
                    amount: 2,
                    ease: 'power1.easeInOut'
                }
            })
    }

    public static async bottomLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        await gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        })
            .from(line, {
                y: 667,
                stagger: {
                    amount: 2,
                    ease: 'power1.easeInOut'
                }
            })
    }
}