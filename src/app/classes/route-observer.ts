import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';


export class RouteObserver {

  private destroy$ = new EventEmitter();
  private route: ActivatedRoute;
  private routeSubject: any;
  public loaded = false;
  private name;
  public observer$: Observable<any>;

  public constructor(route: ActivatedRoute, name: string) {
    this.route = route;
    this.name = name;
    this.observer$ = this.createObserver(this.route.data, false);
  }

  public subscribe(func) {
    return this.observer$.subscribe(func);
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public next(value) {
    if (this.routeSubject) {
      this.routeSubject.next(value);
    }
  }

  private createObserver(routerData$, destroy$ = null, destroyObserver = false) {

    if (routerData$ && this.name) {
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
            if (routerData && routerData[this.name] && routerData[this.name].subject) {

              this.routeSubject = routerData[this.name].subject;

              // Destroy Route Observer when parent has been destroyed
              if (destroy$ && destroyObserver) {
                destroy$.subscribe(() => {
                  routerData[this.name].destroy();
                });
              }

              return this.routeSubject
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

