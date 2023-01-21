import { Component } from '@angular/core';
import { RouteTab } from '../core/models/route-tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  adminNavLinks: RouteTab[] = [];

  constructor () {
    this.adminNavLinks = [
      {
        label: 'Manage User',
        link: 'manage-user',
        index: 0
      }, {
        label: 'Manage Post',
        link: 'manage-post',
        index: 1
      }
    ];
  }
}
