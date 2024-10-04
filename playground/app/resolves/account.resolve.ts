import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { RouteSubject } from '@firestitch/core';
import { of } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';

@Injectable()
export class AccountResolve  {

  constructor() {}

  public resolve(route: ActivatedRouteSnapshot) {
    const routeSubject = new RouteSubject();
    return routeSubject.observe(of(null).pipe(mapTo({ id: 2324, name: 'John' }), delay(1000)));
  }
}
