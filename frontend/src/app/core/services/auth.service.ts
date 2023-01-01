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
  private adminBS$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getUserRole());

  constructor(private router: Router, private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInBS$.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.adminBS$.asObservable();
  }

  setLocalStorage(token: string, role: boolean): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', JSON.stringify(role));
    this.loggedInBS$.next(true);
    this.adminBS$.next(this.getUserRole());
  }

  clearLocalStorage(): void {
    localStorage.clear();
    this.loggedInBS$.next(false);
    this.adminBS$.next(false);
    this.router.navigate(['login']);
  }

  removeUserToken(): void {
    localStorage.clear();
    this.loggedInBS$.next(false);
    this.loggedInBS$.next(false);
    this.router.navigate(['login']);
  }

  getUserToken(): string {
    return localStorage.getItem('token') as string;
  }

  getUserRole(): boolean {
    if (localStorage.getItem('role') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUserInfo(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>('http://localhost:5000/api/user/info');
  }
}
