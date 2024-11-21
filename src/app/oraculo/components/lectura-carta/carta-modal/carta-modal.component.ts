import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carta-modal',
  templateUrl: './carta-modal.component.html',
  styleUrls: ['./carta-modal.component.css'],
})
export class CartaModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { carta: any },
    public dialogRef: MatDialogRef<CartaModalComponent>
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
}
