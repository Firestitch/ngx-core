import { Component, OnDestroy, OnInit } from '@angular/core';
import { BodyClassRenderer } from '../../src/services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private bodyClassRenderer: BodyClassRenderer) {}

  public ngOnInit() {
    this.bodyClassRenderer.init();
  }

  public ngOnDestroy() {
    this.bodyClassRenderer.destroy();
  }
}
