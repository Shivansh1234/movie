import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  successSnackbar(successMessage: string): void {
    this.snackbar.open(successMessage, `Ok`, {
      duration: 1000
    });
  }

  errorSnackbar(errorMessage: string): void {
    this.snackbar.open(errorMessage, `Ok`, {
      duration: 1000
    });
  }

  infoSnackbar(infoMessage: string): void {
    this.snackbar.open(infoMessage, `Ok`, {
      duration: 1000
    });
  }
}
