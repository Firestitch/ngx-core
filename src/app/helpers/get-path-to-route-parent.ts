import { ActivatedRoute } from '@angular/router';


export function getPathToRouteParent(route: ActivatedRoute): string {
  // let stepsBack = 1;
  // let route = this._route.parent;

  // we are looking for parent route to navigate from current dialog
  // but we have to skip routes like loadChildren or redirectTo
  // because it does not make sence to do navigation to them
  // while (route.routeConfig && (route.routeConfig.redirectTo || route.routeConfig.path === '') && route.parent) {
  //   stepsBack++;

  //   if (route.routeConfig.path === '' && route.parent?.routeConfig.loadChildren && route.parent?.parent) {
  //     route = route.parent.parent
  //   } else {
  //     route = route.parent;
  //   }
  // }

  const stepsBack = (route.routeConfig.path.match(/\//g) || []).length + 1;

  // make relative navigation path like '../../../';
  return Array
    .from(Array(stepsBack), () => '../')
    .join('');
}
