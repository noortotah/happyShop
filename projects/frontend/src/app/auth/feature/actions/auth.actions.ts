import { User } from './../../../models/user';
import { createAction, props } from '@ngrx/store';

export const AutoAuth = createAction(
  '[Auth] Auto Auths s',
  props<{ redirect?: boolean  }>()
);
export const Login = createAction(
  '[Auth] login',
  props<{ email: string, password: string }>()
);

export const Register = createAction(
  '[Auth] register',
  props<User>()
);

export const Logout = createAction(
  '[Auth] logout',
  props<{ redirect?: boolean  }>()
);

export const logoutSuccess = createAction(
  '[Auth] logout Success',
  props<{ redirect?: boolean  }>()
);

export const LoadAuthsSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ user: User, redirect?: boolean }>()
);

export const loadAuthsFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);
