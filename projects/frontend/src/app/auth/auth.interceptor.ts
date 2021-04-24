import { AuthenticatedUser } from './feature/selectors/auth.selectors';
import { take, map, exhaustMap } from 'rxjs/operators';
import { AppState } from './../store/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store : Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(AuthenticatedUser).pipe(take(1), map(
      user => {
        return user;
      }
    ), exhaustMap(
      (user) => {
        let authorizedReq = request;
        if (user){
          console.log('AuthInterceptor user', user)
         authorizedReq = request.clone({
            headers: request.headers.set('authorization', user.token),
          });

          return next.handle(authorizedReq);
        }

        return next.handle(request);
      }
    ));
  }
}
