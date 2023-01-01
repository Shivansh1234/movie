import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackbarService: SnackbarService, private readonly zone: NgZone) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    // Please note that ngZone has been added to display snackbar properly
    // NOT SURE IF THIS IS HOW IT IS SUPPOSED TO BE
    this.zone.run(() => {
      this.snackbarService.errorSnackbar(error.error.message);
    });
    return throwError(() => error.error);
  }
}
