import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './core/components/register/register.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthorGuard } from './core/guards/author.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LogoutGuard } from './core/guards/logout.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [LogoutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(ad => ad.AdminModule), canActivate: [LoginGuard, AdminGuard] },
  { path: 'author', loadChildren: () => import('./author/author.module').then(at => at.AuthorModule), canActivate: [LoginGuard, AuthorGuard] },
  { path: 'common', loadChildren: () => import('./shared/shared.module').then(s => s.SharedModule) },

  // redirect home route
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
