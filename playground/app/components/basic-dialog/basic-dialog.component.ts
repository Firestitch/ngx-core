import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'basic-dialog',
    templateUrl: './basic-dialog.component.html',
    standalone: true,
    imports: [FormsModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatInput, MatDialogActions, MatButton, MatDialogClose]
})
export class BasicDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<BasicDialogComponent>>(MatDialogRef);


  public object: any = {};
  public input = '';

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
