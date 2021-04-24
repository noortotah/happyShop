import { Login } from './../feature/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  login(email: string, password: string){
    console.log('login, dispatch')
    this.store.dispatch(Login({ email, password }));
  }





}
