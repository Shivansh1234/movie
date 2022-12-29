import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any = {};

  constructor(private authService: AuthService) { }

  getUserData(): void {
    this.authService.getLoggedInUserInfo().subscribe({
      next: (userData) => {
        console.log(userData);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
