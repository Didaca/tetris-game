import { BehaviorSubject, Subject } from 'rxjs';


class Observables {

    LoadAssets: Subject<boolean> = new Subject();
    LoadUpdateScore: Subject<boolean> = new Subject();
    UpdateScore: Subject<number> = new Subject();
    Pause: Subject<boolean> = new Subject();
    LinesCount: BehaviorSubject<number> = new BehaviorSubject(0);
    LineToAnime: BehaviorSubject<number> = new BehaviorSubject(29);
    LinesInArray: BehaviorSubject<any> = new BehaviorSubject([]);
    // AnimationTime: BehaviorSubject<number> = new BehaviorSubject(2000);

}

export default new Observables();
