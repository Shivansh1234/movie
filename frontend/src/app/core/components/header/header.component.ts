import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = of(false);
  isAdmin$: Observable<boolean> = of(false);

  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.clearLocalStorage();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
  }

}
