import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder, private sharedService: SharedService) { }

  registerForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    this.sharedService.userRegister(this.registerForm.value).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {
  }
}
