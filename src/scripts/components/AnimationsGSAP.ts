import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Matrix } from './Matrix';
import Log from './Log';
import Observables from './Observables';



export default class AnimationsGSAP {

    private static OddLineAnime: GSAPTimeline | null = null;
    private static EvenLineAnime: GSAPTimeline | null = null;
    private static BottomLineAnime: GSAPTimeline | null = null;
    private static DotsAnime: GSAPTimeline | null = null;
    private static BounceAnime: GSAPTimeline | null = null;

    public static async oddLineAnime(line: Array<PIXI.Sprite>[]): Promise<void> {
        const odd = gsap.timeline({
            onComplete: () => { Observables.ToReplaceRows.next() }
        });
        await odd.from(line, {
            y: -200,
            stagger: {
                each: 0.1,
                from: 'random',
                ease: 'none',
            },
        });
        AnimationsGSAP.OddLineAnime = odd;
    }

    public static async evenLineAnime(line: Array<PIXI.Sprite>[]): Promise<void> {
        const even = gsap.timeline({
            onComplete: () => { Observables.ToReplaceRows.next() }
        });
        await even.from(line, {
            x: 800,
            stagger: {
                each: 0.1,
                ease: 'none',
            }
        });
        AnimationsGSAP.EvenLineAnime = even;
    }

    public static async bottomLineAnime(line: Array<PIXI.Sprite>[]): Promise<void> {
        const bottom = gsap.timeline({
            onComplete: () => { Observables.ToReplaceRows.next() }
        });
        await bottom.from(line, {
            y: 667,
            stagger: {
                each: 0.1,
                ease: 'none',
            }
        });
        AnimationsGSAP.BottomLineAnime = bottom;
    }

    public static dotsAnime(dots: Array<HTMLElement | null>): void {
        const dot = gsap.timeline({
            repeat: -1,
        });
        dot.from(dots, {
            opacity: 0,
            stagger: {
                amount: 1,
                ease: 'sine.inOut',
            },
            duration: 0.8,
        });
        AnimationsGSAP.DotsAnime = dot;
    }

    public static bounceAnime(obj: any): void {
        const bounce = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });
        bounce.to(obj.scale, {
            x: 1.1,
            y: 1.1,
            duration: 0.8,
        });
        AnimationsGSAP.BounceAnime = bounce;
    }

    public static destroyAnime(timeline: string): void {
        switch (timeline) {
            case 'DotsAnime':
                AnimationsGSAP.DotsAnime?.kill();
                AnimationsGSAP.DotsAnime = null;
                Log.log('Destroyed DotsAnime!');
                break;
            case 'BounceAnime':
                AnimationsGSAP.BounceAnime?.kill();
                AnimationsGSAP.BounceAnime = null;
                Log.log('Destroyed BounceAnime!');
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