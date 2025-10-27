import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { ExampleComponent } from '../example/example.component';
import { ComponentExampleComponent } from '../component-example/component-example.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, ExampleComponent, ComponentExampleComponent]
})
export class ExamplesComponent {
  public config = environment;
}
