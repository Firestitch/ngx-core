import { Component } from '@angular/core';
import { BodyClassRenderer } from '../../../../src/services';
import { RouteObserver, RouteSubject } from './../../../../src';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public constructor(private bodyClassRenderer: BodyClassRenderer,
                      private route: ActivatedRoute) {}

  public routeObserver = new RouteObserver(this.route);
  public routeSubject = new RouteSubject();

  public tabs = [
    { path: '/body/page1', label: 'Page Without Class' },
    { path: '/body/page2', label: 'Page With Class' }
  ];

  public addClass() {
    this.bodyClassRenderer.addBodyClass('body-from-button-click');
  }
}
