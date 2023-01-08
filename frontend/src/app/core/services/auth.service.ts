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

  private loggedInBS$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getUserToken());
  private rolesBS$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.getUserRoles());

  constructor(private router: Router, private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInBS$.asObservable();
  }

  get getLoggedInRoles(): Observable<string[]> {
    return this.rolesBS$.asObservable();
  }

  setLocalStorage(token: string, role: string[]): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', JSON.stringify(role));
    this.loggedInBS$.next(true);
    this.rolesBS$.next(this.getUserRoles());
  }

  clearLocalStorage(): void {
    localStorage.clear();
    this.loggedInBS$.next(false);
    this.rolesBS$.next([]);
    this.router.navigate(['login']);
  }

  // To be called by Behaviour Subject to get initial values
  getUserToken(): string {
    return localStorage.getItem('token') as string;
  }

  getUserRoles(): string[] {
    const role = localStorage.getItem('role') as string;
    return JSON.parse(role);
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
