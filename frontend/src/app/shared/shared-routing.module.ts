import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutGuard } from './guards/logout.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LogoutGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
