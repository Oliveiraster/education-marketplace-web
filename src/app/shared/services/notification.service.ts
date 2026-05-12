import type { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  apiError(err: HttpErrorResponse, fallback = 'Error inesperado') {
    const message = fallback;

    if (err.error?.message) {
      this.error(`${message}. ${err.error.message}`);
    } else {
      this.error(message);
    }
  }
}
