import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'component-class-page',
    templateUrl: 'component-class-page.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class ComponentClassPageComponent {


}
