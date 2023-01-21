import { Component } from '@angular/core';
import { RouteTab } from '../core/models/route-tab';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  authorNavLinks: RouteTab[] = [];

  constructor () {
    this.authorNavLinks = [
      {
        label: 'View Posts',
        link: 'view-posts',
        index: 0
      }, {
        label: 'Create Post',
        link: 'create-post',
        index: 1
      }
    ];
  }
}
