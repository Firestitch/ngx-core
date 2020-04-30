import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { switchMap, takeUntil, tap, filter, map } from 'rxjs/operators';


export class RouteObserver {

  public loaded = false;

  private _destroy$ = new EventEmitter();
  private _route: ActivatedRoute;
  private _routeSubject: any;
  private _name;
  private _observer$: Observable<any>;

  public constructor(route: ActivatedRoute, name: string) {
    this._route = route;
    this._name = name;
    this.observer$ = this.createObserver(this._route.data, false);
  }

  public set observer$(value) {
    this._observer$ = value;
  }

  public get observer$() {
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

  public subscribe(func) {
    return this.observer$.subscribe(func);
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public next(value) {
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
          ...pipes,
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
                .pipe(...pipes)
                .pipe(tap( val => {
                  this.loaded = true;
                }));
            } else {
              return of()
            }
          })
        )
    } else {
      return of()
    }
  }
}

