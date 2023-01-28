import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: Partial<{ email: string | null; password: string | null; }>): Observable<ApiResponse<{ token: string, role: string[] }>> {
    return this.http.post<any>(`${environment.apiURL}user/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  userRegister(userData: Partial<{ fname: string | null; lname: string | null; email: string | null; password: string | null; }>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${environment.apiURL}user/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
