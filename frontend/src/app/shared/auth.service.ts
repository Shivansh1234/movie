import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  storeUserToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  removeUserToken(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['common', 'login']);
  }
}
