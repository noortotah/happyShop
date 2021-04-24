import { Store } from '@ngrx/store';
import { LoadCategoriesForAdmin, LoadProductsForAdmin } from './../../store/feature/actions/app.actions';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  _opened = false;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(LoadCategoriesForAdmin());
    // this.store.dispatch(LoadProductsForAdmin());
  }

}
