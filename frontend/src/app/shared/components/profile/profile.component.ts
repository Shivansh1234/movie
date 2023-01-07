import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiError } from 'src/app/core/models/api-error';
import { ApiResponse } from 'src/app/core/models/api-response';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  getUserData(): void {
    this.authService.getLoggedInUserInfo()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (profileData: ApiResponse<User>) => {
        this.user = profileData.data;
      },
      error: (err: ApiError) => {
        this.snackbarService.errorSnackbar(err.message);
      }
    })
  }

  ngOnInit(): void {
    this.getUserData();
  }

}
