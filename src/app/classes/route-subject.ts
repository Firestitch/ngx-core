import { BehaviorSubject, Observable, of } from 'rxjs';


export class RouteSubject {

  public subject: BehaviorSubject<any>;

  private _targetObservable: Observable<unknown>;

  constructor() {
    this.subject = new BehaviorSubject(undefined);
  }

  /**
   * Subscribe to observer data changes
   *
   * @param func
   * @returns
   */
  public subscribe(func) {
    return this.subject.subscribe(func);
  }

  /**
   * Observe changes from passed observable (Service)
   *
   * @param observable
   * @returns
   */
  public observe(observable: Observable<unknown>): Observable<RouteSubject> {
    this._targetObservable = observable;
    this._load();

    return of(this);
  }

  /**
   * Provide value to subscriber
   *
   * @param val
   * @returns
   */
  public next(val): Observable<RouteSubject> {
    this.subject.next(val);

    return of(this);
  }

  /**
   * Destroy observer
   */
  public destroy() {
    this.subject.complete();
  }

  public reload(): void {
    this._load();
  }

  private _load(): void {
    this._targetObservable.subscribe((val) => {
      this.next(val);
    });
  }
}
