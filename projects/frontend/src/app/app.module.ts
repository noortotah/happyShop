import { AuthInterceptor } from './auth/auth.interceptor';
import { AppEffects } from './store/feature/effects/app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fromStore from './store';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { ShoppingCartEffects } from './store/feature/effects/shopping-cart.effects';
import { CheckoutSuccessComponent } from './defaults/checkout-success/checkout-success.component';
import { AuthEffects } from './auth/feature/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AdminLayoutComponent,
    CheckoutSuccessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot(fromStore.reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([AppEffects, AuthEffects, ShoppingCartEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // ServiceWorkerModule.register('ngsw-wrker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
