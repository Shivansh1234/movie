import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { LogoutGuard } from './core/guards/logout.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [LogoutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'common', loadChildren: () => import('./shared/shared.module').then(s => s.SharedModule) },

  // redirect home route
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
