import { BehaviorSubject, Subject } from 'rxjs';


class Observables {

    UpdateScore: Subject<number> = new Subject();
    ResetLinesCount: Subject<number> = new Subject();
    FinishLineAnime: BehaviorSubject<boolean> = new BehaviorSubject(false);
    LineToAnime: BehaviorSubject<number> = new BehaviorSubject(29);
    AnimationTime: BehaviorSubject<number> = new BehaviorSubject(2000);
    Pause: Subject<boolean> = new Subject();

}

export default new Observables();
