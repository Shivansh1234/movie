import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: Partial<{ email: string; password: string; }>): Observable<ApiResponse<{ token: string, role: string[] }>> {
    return this.http.post<any>(`http://localhost:5000/api/user/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  userRegister(userData: Partial<{ fname: string | null; lname: string | null; email: string | null; password: string | null; }>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>('http://localhost:5000/api/user/register', userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
