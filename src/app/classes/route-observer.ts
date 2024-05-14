import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import { collectRoutesData } from '../helpers/collect-routes-data';

import { RouteSubject } from './route-subject';


export class RouteObserver<T = unknown> extends Observable<T> {

  private _loaded$ = new BehaviorSubject(false);
  private _routeSubject: RouteSubject;
  private _routeSubject$: Subject<unknown>;

  constructor(route: ActivatedRoute | ActivatedRouteSnapshot, name: string) {
    super();

    const routesData = collectRoutesData(route);
    const stream = combineLatest(routesData)
      .pipe(
        map((data) => {
          return data.reduce((acc, routeData) => {
            return { ...acc, ...routeData };
          }, {});
        }, {}),
        switchMap((routeData: Record<string, RouteSubject | unknown>) => {
          const target = routeData[name];

          if (target instanceof RouteSubject && target.subject) {
            this._routeSubject = target;
            this._routeSubject$ = target.subject;

            return target.subject;
          }

          return of(null);
        }),
        filter((item) => {
          return item !== undefined;
        }),
        map((item) => {
          return cloneDeep(item);
        }),
        tap(() => {
          this._loaded$.next(true);
        }),
      );

    this._subscribe = ((subscriber) => stream.subscribe(subscriber));
  }

  public get loaded(): boolean {
    return this._loaded$.getValue();
  }

  public get value(): any {
    return this._routeSubject?.subject.getValue();
  }

  public get loaded$(): Observable<boolean> {
    return this._loaded$.asObservable();
  }

  public reload(): void {
    this._loaded$.next(false);
    this._routeSubject.reload();
  }

  public next(value): void {
    if (this._routeSubject$) {
      this._routeSubject$.next(value);
    }
  }
}

