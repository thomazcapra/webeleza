import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

const DEFAULT_SNACK_DURATION_S = 1500;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: 'snack--error',
      duration: DEFAULT_SNACK_DURATION_S
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: 'snack--info',
      duration: DEFAULT_SNACK_DURATION_S
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: 'snack--warning',
      duration: DEFAULT_SNACK_DURATION_S
    });
  }

  showSucess(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: 'snack--sucess',
      duration: DEFAULT_SNACK_DURATION_S
    });
  }
}
