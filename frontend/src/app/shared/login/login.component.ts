import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private sharedService: SharedService, private fb: FormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.sharedService.userLogin(this.loginForm.value).subscribe((loginData: any) => {
      console.log(loginData.data.token);
      if (loginData.data.token) {
        this.authService.setUserToken(loginData.data.token);
        this.router.navigate(['common/profile']);
      } else {
        console.log('no heyt')
      }
    })
  }

}
