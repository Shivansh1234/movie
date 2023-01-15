import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';


@NgModule({
  declarations: [
    AuthorComponent,
    ViewPostsComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    ReactiveFormsModule,

    // Material imports
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AuthorModule { }
