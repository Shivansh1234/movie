import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Material Imports
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    // MaterialImports
    MatPaginatorModule
  ]
})
export class AdminModule { }
