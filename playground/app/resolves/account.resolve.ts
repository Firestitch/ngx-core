
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { RouteSubject } from '../../../src';
import { of, pipe } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';

@Injectable()
export class AccountResolve implements Resolve<any> {

  constructor() {}

  public resolve(route: ActivatedRouteSnapshot) {
    const routeSubject = new RouteSubject();
    return routeSubject.observe(of(null).pipe(mapTo({ id: 2324 }),delay(500)));
  }
}
