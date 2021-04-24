import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './../layouts/default-layout/default-layout.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forget-pass', component: ForgetPassComponent },
    { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
