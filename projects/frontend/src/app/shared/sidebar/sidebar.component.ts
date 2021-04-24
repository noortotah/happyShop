import { Logout } from './../../auth/feature/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../store';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    // { path: 'icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: 'maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: 'notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: 'user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: 'categories',         title: 'Category',        icon:'nc-tile-56',    class: '' },
    { path: 'products',         title: 'Products',        icon:'nc-diamond',    class: '' },
    { path: 'orders',           title: 'Orders',        icon:'nc-caps-small', class: '' },
    { path: 'logout',           title: 'Logout',        icon:'nc-single-02', class: ''  },
    // { path: 'upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    // moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    constructor(private store: Store<AppState>){}
    public menuItems: any[];


    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    logout(){
      console.log('logout ')
      this.store.dispatch(Logout({redirect: true}));
    }
}
