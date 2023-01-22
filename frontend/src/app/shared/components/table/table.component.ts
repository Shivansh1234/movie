import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Observable, take } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { CursorEvent } from '../../models/cursor-event';
import { TableColumn } from '../../models/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  public searchControl: FormControl = new FormControl('');
  public displayedColumns: string[] = [];

  @Input() isPageable: boolean = false;
  @Input() isSortable: boolean = false;
  @Input() isFilterable: boolean = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string = '';
  @Input() paginationSizes: number[] = [];
  @Input() defaultPageSize: number = this.paginationSizes[1];

  @Output() onSort: EventEmitter<Sort> = new EventEmitter();
  @Output() onSearch: EventEmitter<CursorEvent> = new EventEmitter<CursorEvent>();
  @Output() onPagination: EventEmitter<CursorEvent> = new EventEmitter<CursorEvent>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component

  @Input() set tableData$(data: Observable<ApiResponse<any[]>>) {
    this.setObservable(data);
  }

  gridData: any[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  totalCount: number = 0;
  pageEvent: PageEvent = new PageEvent();
  nextPage: string = '';
  prevPage: string = '';
  cursorId: string = '';
  cursorDir: string = '';

  constructor() { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.header);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe((value: string) => {
        this.pageIndex = 0;
        const cursorEvent: CursorEvent = {
          filterValue: value,
          pageSize: this.pageSize,
          cursorId: '',
          cursorDir: ''
        }
        this.onSearch.emit(cursorEvent);
      });
  }

  setObservable(data: Observable<ApiResponse<any[]>>) {
    data
      .pipe(
        take(1)
      )
      .subscribe({
        next: (responseData) => {
          this.gridData = responseData.data;
          this.nextPage = responseData.metaData.page.nextPage;
          this.prevPage = responseData.metaData.page.prevPage;
          this.totalCount = responseData.metaData.page.totalCount;
        }
      })
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.header === sortParameters.active)?.field || '';
    this.onSort.emit(sortParameters);
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

    const cursorEvent: CursorEvent = {
      filterValue: this.searchControl.value,
      pageSize: this.pageSize,
      cursorId: this.cursorId,
      cursorDir: this.cursorDir
    }
    this.onPagination.emit(cursorEvent);
  }

  emitRowAction(row: any) {
    this.onRowSelect.emit(row);
  }
}
