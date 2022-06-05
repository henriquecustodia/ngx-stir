import { Observable, Subject } from "rxjs";

export class Stir<T> {

    state: T;

    private stateChanged = new Subject<T>();

    get changes(): Observable<T> {
        return this.stateChanged.asObservable();
    };

    constructor(initialState?: T) {
        if (initialState) {
            this.state = initialState;
        }
    }

    setState(value: T) {
        this.state = value;
        this.stateChanged.next(this.state);
    }

}
