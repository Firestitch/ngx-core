import { Component } from '@angular/core';
import { BodyClassRenderer } from '../../../../src/services';


@Component({
  selector: 'component-class',
  templateUrl: 'component-class.component.html'
})
export class ComponentClassComponent {

  constructor(private bodyClassRenderer: BodyClassRenderer) {}

  public ngOnInit() {
    this.bodyClassRenderer.registerComponentBodyClass(this, 'body-component-class');
  }
}
