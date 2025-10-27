import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'component-class',
    templateUrl: 'component-class.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class ComponentClassComponent {

  constructor() {}

  public ngOnInit() {

  }
}
