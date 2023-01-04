import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Observable<any> = new Observable<any>();
  cursorId: string = '';
  cursorDir: string = '';

  // Pagination inputs
  pageSize: number = 10;
  pageIndex: number = 0;
  pageEvent: PageEvent = new PageEvent();

  constructor(private adminService: AdminService) { }

  adminReq(): void {
    this.userList = this.adminService.sampleReq(this.pageSize, this.cursorId, this.cursorDir);
  }

  onPageChange(event: PageEvent, nextPage: string, prevPage: string): void {
    this.pageEvent = event;
    if (this.pageIndex < this.pageEvent.pageIndex) {
      this.cursorId = nextPage;
      this.cursorDir = 'next';
    } else if (this.pageIndex > this.pageEvent.pageIndex) {
      this.cursorId = prevPage;
      this.cursorDir = 'prev';
    } else {
      this.cursorDir = '';
    }

    // If users changes page size, reset page dir
    if (this.pageSize !== this.pageEvent.pageSize) {
      this.pageSize = this.pageEvent.pageSize;
      this.cursorDir = '';
      this.pageIndex = 0;
    } else {
      this.pageIndex = this.pageEvent.pageIndex;
    }
    this.adminReq();
  }

  ngOnInit(): void {
    this.adminReq();
  }

}
