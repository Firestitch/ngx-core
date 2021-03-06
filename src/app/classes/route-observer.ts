import { ActivatedRoute } from '@angular/router';

import { of, Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap, filter, map, tap } from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import { RouteSubject } from './route-subject';
import { collectRoutesData } from '../helpers/collect_routes_data';


export class RouteObserver<T = unknown> extends Observable<T> {

  private _loaded$ = new BehaviorSubject(false);
  private _routeSubject$: Subject<unknown>;

  public constructor(route: ActivatedRoute, name: string) {
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
            this._routeSubject$ = target.subject;

            return target.subject;
          } else {
            return of(null);
          }
        }),
        filter((item) => {
          return item !== undefined;
        }),
        map(item => {
          return cloneDeep(item);
        }),
        tap(() => {
          this._loaded$.next(true);
        }),
      );

    this._subscribe = (subscriber => stream.subscribe(subscriber));
  }

  public get loaded(): boolean {
    return this._loaded$.getValue();
  }

  public get loaded$(): Observable<boolean> {
    return this._loaded$.asObservable();
  }

  public next(value): void {
    if (this._routeSubject$) {
      this._routeSubject$.next(value);
    }
  }
}

