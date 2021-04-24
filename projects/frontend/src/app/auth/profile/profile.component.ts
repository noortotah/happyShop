import { Observable } from 'rxjs';
import { AuthenticatedUser } from './../feature/selectors/auth.selectors';
import { User } from './../../models/user';
import {  Logout } from './../feature/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    active = 1;
    user$: Observable<User>;
    constructor(private store: Store<AppState>) { }

    ngOnInit() {
      this.user$ = this.store.select(AuthenticatedUser);
    }

    logout() {
      this.store.dispatch( Logout({ redirect: true}));
    }

}
