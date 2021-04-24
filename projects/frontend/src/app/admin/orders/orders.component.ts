import { LoadOrdersForAdmin } from './../../store/feature/actions/app.actions';
import { Observable } from 'rxjs';
import { selectAdminOrdersState } from './../../store/feature/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Order } from '../../models/order';
import { RemoveItemFromShoppingCartSuccess } from '../../store/feature/actions/shopping-cart.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(LoadOrdersForAdmin());
    this.orders$ = this.store.select(selectAdminOrdersState);
  }


  getTotal(items){
    return items.reduce((acc, item) => acc + ( item.product.pricing?.price ? +item.product.pricing?.price : 0) , 0);
  }
}
