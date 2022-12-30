import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private sharedService: SharedService, private fb: NonNullableFormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.sharedService.userLogin(this.loginForm.value).subscribe({
      next: (loginData) => {
        if (loginData.data.token) {
          this.authService.setUserToken(loginData.data.token);
          this.router.navigate(['common/profile']);
        } else {
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }
}
