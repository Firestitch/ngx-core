import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public constructor(private route: ActivatedRoute) {}

  public tabs = [
    { path: '/body/page1', label: 'Page Without Class' },
    { path: '/body/page2', label: 'Page With Class' }
  ];

  public addClass() {

  }
}
