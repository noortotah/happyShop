
import { User } from './../../../models/user';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import * as ShoppingCartActions from '../../../store/feature/actions/shopping-cart.actions';
import { of } from 'rxjs';
import { environment } from 'projects/frontend/src/environments/environment';



const AuthenticationSuccessHandler = responseData => {
  console.log('00000000', responseData);
  localStorage.setItem('user', JSON.stringify(responseData.user));
  return AuthActions.LoadAuthsSuccess(responseData);
};

@Injectable()
export class AuthEffects {

  @Effect()
  autoAuth$ = this.actions$.pipe(
    ofType(AuthActions.AutoAuth),
    map(() => {
      return JSON.parse(localStorage.getItem('user'));
    }),
    map((user: User) => {
      if (!user) {
        return AuthActions.Logout({ redirect: false });
      }
      console.log('the problem is here')
      return AuthenticationSuccessHandler({ user, redirect: false });
    })
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActions.Register),
    switchMap((userData) => {
      return this.httpClient
        .post( environment.backend_url+ 'auth/register', userData)
        .pipe(
          map((response: { user: User; success: boolean }) =>
            AuthActions.LoadAuthsSuccess({
              user: response.user,
              redirect: true,
            })
          ),
          catchError((error) => of())
        );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.Login),
    switchMap((userData) => {
      return this.httpClient
        .post(environment.backend_url+'auth/login', userData)
        .pipe(
          map((response: { user: User; success: boolean }) =>
            AuthenticationSuccessHandler({
              user: response.user,
              redirect: true,
            })
          ),
          catchError((error) => of())
        );
    })
  );

  @Effect({ dispatch: false })
  AuthSuccess$ = this.actions$.pipe(
    ofType(AuthActions.LoadAuthsSuccess),
    tap((user) => {
      console.log('load auth success', user)
     localStorage.setItem('user', JSON.stringify(user.user));
      if(user.redirect){
          if(user.user.isAdmin){
              console.log('this is admin')
              this.router.navigate(['/admin/dashboard']);
          }else{
            this.router.navigate(['/auth/profile']);
          }
      }else{
        console.log('please stoooooop redirect')
      }


    })
  );

  @Effect({ dispatch: false })
  loadAuthsFailure$ = this.actions$.pipe(
    ofType(AuthActions.loadAuthsFailure),
    tap((actionData) => {
      localStorage.setItem('user', null);
    })
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.Logout),
    switchMap((userData) => {
      return this.httpClient
        .post(environment.backend_url + 'auth/logout', userData)
        .pipe(
          map((response: { success: boolean }) =>
            AuthActions.logoutSuccess({
              redirect: userData.redirect
            })
          ),
          catchError((error) => of())
        );
    })
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActions.logoutSuccess),
    tap((logoutSuccessData) => {
      localStorage.setItem('user', null);
      if(logoutSuccessData.redirect)
        this.router.navigate(['/auth/login']);
    })
  );



  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
