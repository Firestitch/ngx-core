import { Component } from '@angular/core';
import { RouteObserver, RouteSubject } from './../../../../src';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public routeObserver = new RouteObserver(this.route);
  public routeSubject = new RouteSubject();

  public constructor(private route: ActivatedRoute) {
  }
}
