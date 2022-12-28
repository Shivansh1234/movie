import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { LogoutGuard } from './logout.guard';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

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
