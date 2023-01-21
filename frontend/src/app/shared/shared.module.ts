import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TableComponent } from './components/table/table.component';

// Material Inputs
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ProfileComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule
  ],
  exports: [TableComponent]
})
export class SharedModule { }
