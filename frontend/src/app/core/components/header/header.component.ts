import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../../enums/role';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = of(false);
  roles$: Observable<string[]> = of([]);
  roleEnum: typeof Role = Role;

  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.clearLocalStorage();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.roles$ = this.authService.getLoggedInRoles;
  }

}
