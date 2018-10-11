import { Component } from '@angular/core';
import { BodyClass } from './../../src';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(bodyClass: BodyClass) {

  }
}
