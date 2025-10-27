import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

import { RouteObserver } from '@firestitch/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';
import { JsonPipe } from '@angular/common';

@Component({
    templateUrl: './observer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatTabNav,
        MatTabLink,
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
        JsonPipe,
    ],
})
export class ObserverComponent implements OnInit, OnDestroy {

  public account;
  public routeObserver;

  public tabs = [
    { path: '/observer/page1', label: 'Page 1' },
    { path: '/observer/page2', label: 'Page 2' },
  ];

  private _destroy$ = new Subject<void>();
  private _cdRef = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
  ) {
    this.routeObserver = new RouteObserver<{ field: number }>(this.route, 'account');
  }

  public ngOnInit() {
    this.routeObserver
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((account) => {
        this.account = account;

        this._cdRef.markForCheck();
      });

    setTimeout(() => {
      this.routeObserver
        .next({ id: 555, name: 'Bob' });
    }, 3000);
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
    // this.routeObserver.destroy();
  }
}
