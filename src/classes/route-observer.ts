import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

export class RouteObserver {

  private destroy$ = new EventEmitter();
  private route: ActivatedRoute;
  public loaded = false;

  public constructor(route: ActivatedRoute) {
    this.route = route;
  }

  public subscribe(func, name) {
    return this._subscribe(func, name, this.route.data, false);
  }

  public subscribeChild(func, name) {
    return this._subscribe(func, name, this.route.parent.data, false);
  }

  private _subscribe(func, name, data, destroyObserver) {

    // const pattern = /function[^(]*\(([^)]*)\)/;
    // const name = func.toString().match(pattern)[1].split(/,\s*/)[0];

    return this.readRouteData(data, name, this.destroy$, destroyObserver)
            .subscribe(func);
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readRouteData(routerData$, dataKey, destroy$ = null, destroyObserver = false) {

    if (routerData$ && dataKey) {
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
            if (routerData && routerData[dataKey] && routerData[dataKey].subject) {

              // Destroy Route Observer when parent has been destroyed
              if (destroy$ && destroyObserver) {
                destroy$.subscribe(() => {
                  routerData[dataKey].destroy();
                })
              }

              routerData[dataKey].subject.subscribe(() => {
                this.loaded = true;
              });

              return routerData[dataKey].subject.pipe(...pipes);
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

