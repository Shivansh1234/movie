import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User> = new Observable<User>();

  constructor(
    private authService: AuthService,
  ) { }

  getUserData(): void {
    this.user$ = this.authService.getLoggedInUserInfo().pipe(
      map(user => user.data)
    );
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
