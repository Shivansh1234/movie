import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiError } from 'src/app/core/models/api-error';
import { AuthService } from '../../services/auth.service';
import { CoreService } from '../../services/core.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private coreService: CoreService,
    private snackbarService: SnackbarService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.coreService.userLogin(this.loginForm.value)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (loginData) => {
        console.log(loginData);
        if (loginData.data.token) {
          this.authService.setLocalStorage(loginData.data.token, loginData.data.role);
          this.router.navigate(['home']);
        }
      },
      error: (err: ApiError) => {
        this.snackbarService.errorSnackbar(err.message);
      }
    });
  }
}
