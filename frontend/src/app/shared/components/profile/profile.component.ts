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
    this.authService.getLoggedInUserInfo().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
