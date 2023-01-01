import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tests: Observable<User> = new Observable<User>();

  constructor(private adminService: AdminService) {}

  adminReq(): void {
    this.tests = this.adminService.sampleReq().pipe(
      map(x => x.data)
    );
  }

  ngOnInit(): void {
    this.adminReq();
  }

}
