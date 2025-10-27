import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'example',
    templateUrl: 'example.component.html',
    standalone: true,
    imports: [MatTabNav, MatTabLink, RouterLinkActive, RouterLink, RouterOutlet, MatButton]
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
