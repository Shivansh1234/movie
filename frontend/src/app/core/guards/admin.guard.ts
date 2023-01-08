import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  roleEnum: typeof Role = Role;

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('role')?.includes(this.roleEnum.ADMIN)) {
      return true;
    } else {
      this.router.navigate(['common', 'profile']);
      return false;
    }
  }

}
