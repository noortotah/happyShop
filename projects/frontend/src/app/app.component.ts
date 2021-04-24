import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './store';
import { AutoAuth } from './auth/feature/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(AutoAuth({redirect: false}));

  }

}
