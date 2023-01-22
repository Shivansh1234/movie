import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { TableColumn } from '../../models/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  public searchControl: FormControl = new FormControl();
  public displayedColumns: string[] = [];
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string = '';
  @Input() paginationSizes: number[] = [];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() onSort: EventEmitter<Sort> = new EventEmitter();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPagination: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.searchControl.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe((value: string) => {
        this.onSearch.emit(value);
      });
  }

  setTableDataSource(data: any) {
    this.tableDataSource.data = data;
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)?.dataKey || '';
    this.onSort.emit(sortParameters);
  }

  onPageChange(event: PageEvent): void {
    this.onPagination.emit(event);
  }

  emitRowAction(row: any) {
    this.onRowSelect.emit(row);
  }
}
