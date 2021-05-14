import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteObserver } from '@firestitch/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'observer.component.html'
})
export class ObserverComponent implements OnInit, OnDestroy {

  public constructor(private route: ActivatedRoute) {}
  public account;
  public routeObserver = new RouteObserver<{ field: number }>(this.route, 'account');

  public tabs = [
    { path: '/observer/page1', label: 'Page 1' },
    { path: '/observer/page2', label: 'Page 2' }
  ];

  private _destroy$ = new Subject<void>();

  ngOnInit() {
    this.routeObserver
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((account) => {
        this.account = account;
      });

    setTimeout(() => {
      this.routeObserver
        .next({ id: 555, name: 'Bob' });
    }, 3000);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    // this.routeObserver.destroy();
  }
}
