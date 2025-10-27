import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy {

  constructor() {}

  public ngOnInit() {

  }

  public ngOnDestroy() {

  }
}
