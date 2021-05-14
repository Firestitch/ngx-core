import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export function collectRoutesData(route: ActivatedRoute): Observable<Record<string, unknown>>[] {
  const dataSubjects: Observable<Record<string, unknown>>[] = [];

  let r = route;
  do {
    dataSubjects.unshift(route.data);
    r = r.parent;
  }
  while (r);

  return dataSubjects;
}
