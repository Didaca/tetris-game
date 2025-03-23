import { BehaviorSubject, Subject } from 'rxjs';


export default class Observables {

    public static LoadAssets: Subject<boolean> = new Subject();
    public static LoadUpdateScore: Subject<boolean> = new Subject();
    public static UpdateScore: Subject<number> = new Subject();
    public static Pause: Subject<boolean> = new Subject();
    public static LinesCount: BehaviorSubject<number> = new BehaviorSubject(0);
    public static LineToAnime: BehaviorSubject<number> = new BehaviorSubject(29);
    public static LinesInArray: BehaviorSubject<any> = new BehaviorSubject([]);
    // AnimationTime: BehaviorSubject<number> = new BehaviorSubject(2000);

}
