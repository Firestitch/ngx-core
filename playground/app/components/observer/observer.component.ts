import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteObserver } from '@firestitch/core';

@Component({
  templateUrl: 'observer.component.html'
})
export class ObserverComponent implements OnInit, OnDestroy {

  public constructor(private route: ActivatedRoute) {}
  public account = {};
  public routeObserver = new RouteObserver(this.route, 'account');

  public tabs = [
    { path: '/observer/page1', label: 'Page 1' },
    { path: '/observer/page2', label: 'Page 2' }
  ];

  ngOnInit() {
    this.routeObserver
    .subscribe(account => {
      this.account = account;
    });

    setTimeout(() => {
      this.routeObserver
      .next({ name: 'Bob' });
    }, 2000);
  }

  ngOnDestroy() {
    this.routeObserver.destroy();
  }
}
