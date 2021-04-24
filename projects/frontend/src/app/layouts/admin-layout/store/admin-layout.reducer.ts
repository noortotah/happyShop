import { AdminLayoutActionTypes } from './admin-layout.actions';
import { Action } from '@ngrx/store';


export const adminLayoutFeatureKey = 'adminLayout';

export interface State {
  isSidebarOpen: boolean
}

export const initialState: State = {
  isSidebarOpen: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case AdminLayoutActionTypes.ToggleSideBarMenu:
      return {
        ...state,
        isSidebarOpen : !state.isSidebarOpen
      };
    default:
      return state;
  }
}
