import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: Partial<{ email: string; password: string; }>): Observable<any> {
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
