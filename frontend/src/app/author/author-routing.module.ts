import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author.component';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';

const routes: Routes = [
  { path: '', component: AuthorComponent },
  { path: 'view-posts', component: ViewPostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
