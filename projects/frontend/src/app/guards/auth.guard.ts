import { take, map } from 'rxjs/operators';
import { isLoggedIn } from './../auth/feature/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(isLoggedIn).pipe(
        take(1),
        map(isLogged => {
          console.log('000000000000000000000auth guard',isLogged);
          if (isLogged) {
            console.log('isLogged in guard',isLogged);
            return true;
          }else {
            console.log('heeere in navigate AuthGuard')
            return this.router.createUrlTree(['/auth/login']);
          }
        })
      );
  }

}
