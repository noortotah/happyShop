import { User } from './../../../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);


export const AuthenticatedUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => {
    return state.user
  }
);

export const isLoggedIn = createSelector(
  selectAuthState,
  () => {
    // return true;
    const localUser = localStorage.getItem('user');
    console.log(localUser);

    let user = null;
    if (localUser !== 'undefined' && localUser !== null) {
      user  =  JSON.parse(localUser);
    }

    console.log(user);
    console.log('isLoggedSelector', user  !==  null)
    return  user  !==  null;

  }
);


export const isAdmin = createSelector(
  selectAuthState,
  (state: fromAuth.State) => {
    const localUser = localStorage.getItem('user');
    console.log(localUser);

    let user = null;
    if (localUser !== 'undefined' && localUser !== null) {
      user  =  JSON.parse(localUser);
    }
    if(user !== null){
      return user.isAdmin ? true : false;
    }
    return false;

  }
);

