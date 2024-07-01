import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) { }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
