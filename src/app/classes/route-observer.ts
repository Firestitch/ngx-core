import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { of, Observable, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil, tap, filter, map } from 'rxjs/operators';


export class RouteObserver<T = unknown> {

  public loaded = false;

  private _destroy$ = new Subject();
  private _route: ActivatedRoute;
  private _routeSubject: Subject<unknown>;
  private _name: string;
  private _observer$: Observable<T>;

  public constructor(route: ActivatedRoute, name: string) {
    this._route = route;
    this._name = name;
    this.observer$ = this.createObserver(this._route.data, this._destroy$);
  }

  public set observer$(value: Observable<T>) {
    this._observer$ = value;
  }

  public get observer$(): Observable<T> {
    return this._observer$
    .pipe(
      filter(item => {
        return item !== undefined;
      }),
      map(item => {
        return cloneDeep(item);
      })
    )
  }

  public subscribe(func): Subscription {
    return this.observer$.subscribe(func);
  }

  public destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public next(value): void {
    if (this._routeSubject) {
      this._routeSubject.next(value);
    }
  }

  private createObserver(routerData$, destroy$ = null, destroyObserver = false) {

    if (routerData$ && this._name) {
      const pipes = [];

      if (destroy$) {
        pipes.push(
          takeUntil(destroy$)
        )
      }

      return routerData$
        .pipe(
          switchMap((routerData: any) => {
            if (routerData && routerData[this._name] && routerData[this._name].subject) {

              this._routeSubject = routerData[this._name].subject;

              // Destroy Route Observer when parent has been destroyed
              if (destroy$ && destroyObserver) {
                destroy$.subscribe(() => {
                  routerData[this._name].destroy();
                });
              }

              return this._routeSubject
                .pipe(...pipes as [])
                .pipe(tap( val => {
                  this.loaded = true;
                }));
            } else {
              return of()
            }
          }),
          ...pipes,
        )
    } else {
      return of()
    }
  }
}

