import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'basic-dialog',
  templateUrl: './basic-dialog.component.html'
})
export class BasicDialogComponent {

  public object: any = {};
  public input = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BasicDialogComponent>
  ) {}

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
