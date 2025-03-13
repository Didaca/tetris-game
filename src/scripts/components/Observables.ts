import { BehaviorSubject, Subject } from 'rxjs';


class Observables {

    UpdateScore: Subject<number> = new Subject();
    ResetLinesCount: Subject<number> = new Subject();
    FinishLineAnime: BehaviorSubject<boolean> = new BehaviorSubject(false);
    LineToAnime: BehaviorSubject<number> = new BehaviorSubject(29);
    InAnime: BehaviorSubject<boolean> = new BehaviorSubject(false);
    FinishLinesReplaced: BehaviorSubject<boolean> = new BehaviorSubject(false);

}

export default new Observables();
