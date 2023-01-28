import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  changePasswordRequest(passwordObj: any): Observable<ApiResponse<void>> {
    passwordObj = passwordObj;
    return this.http.put<ApiResponse<void>>('http://localhost:5000/api/user/changepassword', passwordObj).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
