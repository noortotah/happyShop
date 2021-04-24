import { Action } from '@ngrx/store';

export enum AdminLayoutActionTypes {
  ToggleSideBarMenu = '[AdminLayout] Toggle Sidebar Menu',


}

export class ToggleSideBarMenu implements Action {
  readonly type = AdminLayoutActionTypes.ToggleSideBarMenu;
}


export type AdminLayoutActions = ToggleSideBarMenu;
