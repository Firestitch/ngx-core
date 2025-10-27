import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'component-example',
    templateUrl: 'component-example.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class ComponentExampleComponent {

}
