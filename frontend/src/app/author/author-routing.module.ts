import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';

const routes: Routes = [
  {
    path: '', component: AuthorComponent,
    children: [
      { path: '', redirectTo: 'view-posts', pathMatch: 'full' },
      { path: 'view-posts', title: 'View Posts', component: ViewPostsComponent },
      { path: 'create-post', title: 'Create Post', component: CreatePostComponent },
    ]
  },
  { path: 'post-detail/:id', component: PostDetailComponent },
  { path: 'edit-post/:id', component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
