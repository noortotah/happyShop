import { isAdmin } from './../auth/feature/selectors/auth.selectors';
import { take, map } from 'rxjs/operators';
import { AppState } from '../store/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private store: Store<AppState>,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(isAdmin).pipe(
        take(1),
        map(isAdmin => {
          if (isAdmin) {
            console.log(isAdmin);
            return true;
          }else {
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

}
