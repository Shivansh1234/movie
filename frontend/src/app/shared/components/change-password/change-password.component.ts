import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ApiError } from 'src/app/core/models/api-error';
import { ApiResponse } from 'src/app/core/models/api-response';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) { }

  initForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.profileService.changePasswordRequest(this.changePasswordForm.value)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data: ApiResponse<void>) => {
          this.snackbarService.successSnackbar(data.message);
        },
        error: (err: ApiError) => {
          this.snackbarService.errorSnackbar(err.message);
        }
      })
  }

  ngOnInit(): void {
    this.initForm();
  }
}
