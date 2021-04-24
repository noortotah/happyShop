import { StoreModule } from '@ngrx/store';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { EffectsModule } from '@ngrx/effects';
// import { AuthEffects } from './feature/effects/auth.effects';
import * as fromAuthStore from './feature/reducers/auth.reducer';
import { AuthEffects } from './feature/effects/auth.effects';

@NgModule({
  declarations: [ProfileComponent, LoginComponent, SignupComponent, ForgetPassComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbNavModule,
    // AngularFireAuthModule,
    AuthRoutingModule,
    // StoreModule.forFeature('auth', fromAuthStore.reducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  providers: []
})
export class AuthModule { }
