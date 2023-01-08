import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enums/role';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  adminEnum: string = Role.ADMIN;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('role')?.includes(this.adminEnum)) {
      return true;
    } else {
      this.snackbarService.errorSnackbar('Unauthorized Admin access');
      this.router.navigate(['common', 'profile']);
      return false;
    }
  }

}
