import { User } from './../../../models/user';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,
    on(AuthActions.AutoAuth, (state) => {  return state}),
    on(AuthActions.logoutSuccess, (state, action) => ({ ...state, user: null}) ),
    on(AuthActions.LoadAuthsSuccess, (state, { user }) => {

      return {
        ...state,
        user
    }
  })

);

