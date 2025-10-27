import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent} from '../basic-dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'basic-example',
    templateUrl: 'basic.component.html',
    standalone: true,
    imports: [MatButton]
})
export class BasicComponent {
  private dialog = inject(MatDialog);


  public dialogRef;

  public open() {
    this.dialogRef = this.dialog.open(BasicDialogComponent, {
      data: { }
    });

    this.dialogRef.afterClosed().subscribe(response => {

    });
  }

  close(data = null) {
    this.dialogRef.close(data);
  }
}
