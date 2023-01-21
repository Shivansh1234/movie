import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, tap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {

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
  searchControl: FormControl = new FormControl();
  filterValue: string = '';

  constructor(
    private adminService: AdminService
  ) { }

  adminReq(): void {
    this.userList$ = this.adminService.getUserListRequest(this.filterValue, this.pageSize, this.cursorId, this.cursorDir)
      .pipe(
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

  applyFilter(value: string): void {
    this.filterValue = value;
    this.cursorDir = '';
    this.cursorId = '';
    this.pageIndex = 0;
    this.adminReq();
  }

  ngOnInit(): void {
    this.adminReq();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(data => {
        this.applyFilter(data);
      });
  }
}