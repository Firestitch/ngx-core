import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

export function collectRoutesData(
  route: ActivatedRoute | ActivatedRouteSnapshot,
): Observable<Record<string, unknown>>[] {
  const dataSubjects: Observable<Record<string, unknown>>[] = [];

  if (route instanceof ActivatedRouteSnapshot) {
    let r = route;
    do {
      dataSubjects.unshift(of(r.data));
      r = r.parent;
    }
    while (r);

  } else if (route instanceof ActivatedRoute) {
    let r = route;
    do {
      dataSubjects.unshift(r.data);
      r = r.parent;
    }
    while (r);
  }

  return dataSubjects;
}
