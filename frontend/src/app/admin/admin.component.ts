import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, take, tap } from 'rxjs';
import { ApiError } from '../core/models/api-error';
import { ApiResponse } from '../core/models/api-response';
import { User } from '../core/models/user';
import { SnackbarService } from '../core/services/snackbar.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList$: Observable<ApiResponse<User[]>> = new Observable<ApiResponse<User[]>>;

  // Pagination inputs
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;
  pageEvent: PageEvent = new PageEvent();
  nextPage: string = '';
  prevPage: string = '';
  cursorId: string = '';
  cursorDir: string = '';

  // filter inits
  filterValue: string = '';

  constructor(
    private adminService: AdminService
  ) { }

  adminReq(): void {
    this.userList$ = this.adminService.getUserListRequest(this.filterValue, this.pageSize, this.cursorId, this.cursorDir)
      .pipe(
        debounceTime(1000),
        tap((userData: ApiResponse<User[]>) => {
          this.nextPage = userData.metaData.page.nextPage;
          this.prevPage = userData.metaData.page.prevPage;
          this.totalCount = userData.metaData.page.totalCount;
        })
      );
  }

  onPageChange(event: PageEvent): void {
    this.pageEvent = event;
    if (this.pageIndex < this.pageEvent.pageIndex) {
      this.cursorId = this.nextPage;
      this.cursorDir = 'next';
    } else if (this.pageIndex > this.pageEvent.pageIndex) {
      this.cursorId = this.prevPage;
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

  applyFilter(event: any): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.cursorDir = '';
    this.cursorId = '';
    this.pageIndex = 0;
    this.adminReq();
  }

  ngOnInit(): void {
    this.adminReq();
  }

}
