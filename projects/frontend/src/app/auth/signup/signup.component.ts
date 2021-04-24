import { Register } from './../feature/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  test: Date = new Date();
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  signup(first_name: string, last_name: string, email: string, password: string, confirmPassword: string) {
    console.log('singup');
    this.store.dispatch(Register({ first_name, last_name, email, password, confirmPassword }));
  }
}
