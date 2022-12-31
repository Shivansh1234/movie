import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getUserToken());

  constructor(private router: Router, private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  setUserToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn$.next(true);
  }

  removeUserToken(): void {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
    this.router.navigate(['login']);
  }

  getUserToken(): string {
    return localStorage.getItem('token') as string;
  }

  getLoggedInUserInfo(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>('http://localhost:5000/api/user/info').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
