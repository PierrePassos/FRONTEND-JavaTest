import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from "../modules/global/component/alert/alert.component";
import { ConfirmationComponent } from "../modules/global/component/confirmation/confirmation.component";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private dialog: MatDialog) { }

    openAlert(message: string, color: 'success' | 'danger' | 'warning',duration: number = 3000): void {
        const dialogRef = this.dialog.open(AlertComponent, {
            data: { message, color, duration },
            width: '800px',
            maxHeight: '90vh',
            maxWidth: '90%',
        });

        setTimeout(() => {
            dialogRef.close();
        }, duration);
    }

    openConfirmation(title: string, message: string): Promise<boolean> {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            data: { title, message },
            width: '400px',
            maxHeight: '90vh',
            maxWidth: '90%',
            panelClass: 'confirmation-dialog',
        });

        return dialogRef.afterClosed().toPromise();
    }
}