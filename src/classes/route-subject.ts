import { ReplaySubject, of, Observable } from 'rxjs';


export class RouteSubject {

  public subject;

  constructor() {
    this.subject = new ReplaySubject();
  }

  /**
   * Subscribe to observer data changes
   * @param func
   * @returns {any}
   */
  public subscribe(func) {
    return this.subject.subscribe(func);
  }

  /**
   * Observe changes from passed observable (Service)
   * @param observable
   * @returns {Observable<this>}
   */
  public observe(observable): Observable<RouteSubject> {

    observable.subscribe(val => {
      this.next(val);
    });

    return of(this);
  }

  /**
   * Provide value to subscribers
   * @param val
   * @returns {Observable<this>}
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
}
