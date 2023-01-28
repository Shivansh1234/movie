import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { CursorEvent } from 'src/app/shared/models/cursor-event';
import { TableColumn } from 'src/app/shared/models/table-column';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {

  users$: Observable<ApiResponse<any[]>> = new Observable<ApiResponse<any[]>>

  userTableColumns: TableColumn[] = [
    { header: 'First Name', field: 'fname' },
    { header: 'Last Name', field: 'lname' },
    { header: 'Email', field: 'email' },
    { header: 'Roles', field: 'role' }
  ]

  cursorEvent: CursorEvent = {
    filterValue: '',
    pageSize: 5,
    cursorId: '',
    cursorDir: ''
  }

  constructor(
    private adminService: AdminService
  ) { }

  adminReq(): void {
    this.users$ = this.adminService.getUserListRequest(this.cursorEvent.filterValue, this.cursorEvent.pageSize, this.cursorEvent.cursorId, this.cursorEvent.cursorDir);
  }

  onPageChange(event: CursorEvent): void {
    this.cursorEvent = event;
    this.adminReq();
  }

  applyFilter(event: CursorEvent): void {
    this.cursorEvent = event;
    this.adminReq();
  }

  ngOnInit(): void {
    this.adminReq();
  }
}
