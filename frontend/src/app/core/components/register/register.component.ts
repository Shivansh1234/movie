import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '../../models/api-error';
import { ApiResponse } from '../../models/api-response';
import { User } from '../../models/user';
import { CoreService } from '../../services/core.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private coreService: CoreService,
    private snackbarService: SnackbarService
  ) { }

  registerForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    this.coreService.userRegister(this.registerForm.value).subscribe({
      next: (registerData: ApiResponse<User>) => {
        this.router.navigate(['login']);
        this.snackbarService.successSnackbar(registerData.message);
      },
      error: (err: ApiError) => {
        this.snackbarService.errorSnackbar(err.message);
      }
    });
  }

  ngOnInit(): void {
  }
}
