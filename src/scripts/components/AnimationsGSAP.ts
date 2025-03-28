import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Matrix } from './Matrix';
import Log from './Log';



export default class AnimationsGSAP {

    private static OddLineAnime: GSAPTimeline | null = null;
    private static EvenLineAnime: GSAPTimeline | null = null;
    private static BottomLineAnime: GSAPTimeline | null = null;
    private static DotsAnime: GSAPTimeline | null = null;

    public static async oddLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        const odd = gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        });
        await odd.from(line, {
            y: -200,
            stagger: {
                amount: 2,
                from: 'random',
                ease: 'power1.InOut',
            },
        });
        AnimationsGSAP.OddLineAnime = odd;
    }

    public static async evenLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        const even = gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        });
        await even.from(line, {
            x: 800,
            stagger: {
                amount: 2,
                ease: 'power1.InOut',
            }
        });
        AnimationsGSAP.EvenLineAnime = even;
    }

    public static async bottomLineAnime(line: Array<PIXI.Sprite>[], matrix: Matrix): Promise<void> {
        const bottom = gsap.timeline({
            onComplete: () => { matrix.replaceRows() }
        });
        await bottom.from(line, {
            y: 667,
            stagger: {
                amount: 2,
                ease: 'power1.InOut',
            }
        });
        AnimationsGSAP.BottomLineAnime = bottom;
    }

    public static dotsAnime(dots: Array<HTMLElement | null>): void {
        const dot = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.6,
        });
        dot.from(dots, {
            opacity: 0,
            stagger: {
                amount: 1,
                ease: 'sine.inOut',
            }
        });
        AnimationsGSAP.DotsAnime = dot;
    }

    public static destroyAnime(timeline: string): void {
        switch (timeline) {
            case 'DotsAnime':
                AnimationsGSAP.DotsAnime?.kill();
                AnimationsGSAP.DotsAnime = null;
                Log.log('Destroyed DotsAnime!');
                break;
            case 'BottomLineAnime':
                AnimationsGSAP.BottomLineAnime?.kill();
                AnimationsGSAP.BottomLineAnime = null;
                Log.log('Destroyed BottomLineAnime!');
                break;
            case 'EvenLineAnime':
                AnimationsGSAP.EvenLineAnime?.kill();
                AnimationsGSAP.EvenLineAnime = null;
                Log.log('Destroyed EvenLineAnime!');
                break;
            case 'OddLineAnime':
                AnimationsGSAP.OddLineAnime?.kill();
                AnimationsGSAP.OddLineAnime = null;
                Log.log('Destroyed OddLineAnime!');
                break;
            default:
                break;
        }
    }
}