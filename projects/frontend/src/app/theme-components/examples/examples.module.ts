import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from '../../auth/profile/profile.component';
import { SignupComponent } from '../../auth/signup/signup.component';
import { NgbNav, NgbNavConfig, NgbNavModule, NgbModule, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        // LandingComponent,
        // SignupComponent,
        // ProfileComponent,


    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      NgbNavModule


    ],
    exports: [
      // LandingComponent,
      // SignupComponent,
      // ProfileComponent,


    ]
})
export class ExamplesModule { }
