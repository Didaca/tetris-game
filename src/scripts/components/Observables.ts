import { BehaviorSubject, Subject } from 'rxjs';


class Observables {

    LoadAssets: Subject<boolean> = new Subject();
    UpdateScore: Subject<number> = new Subject();
    ResetLinesCount: Subject<number> = new Subject();
    Pause: Subject<boolean> = new Subject();
    FinishLineAnime: BehaviorSubject<boolean> = new BehaviorSubject(false);
    LineToAnime: BehaviorSubject<number> = new BehaviorSubject(29);
    AnimationTime: BehaviorSubject<number> = new BehaviorSubject(2000);

}

export default new Observables();
