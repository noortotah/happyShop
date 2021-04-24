import { environment } from 'projects/frontend/src/environments/environment';
import { Checkout } from './../../store/feature/actions/shopping-cart.actions';
import { RemoveItemFromShoppingCart } from './../../store/feature/actions/shopping-cart.actions';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from './../../models/cartItem';
import { Observable } from 'rxjs';
import { selectSelectedItemsState, selectSelectedItemsTotalState } from '../../store/feature/selectors/shopping-cart.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/index';

@Component({
  selector: 'app-expanded-shopping-cart',
  templateUrl: './expanded-shopping-cart.component.html',
  styleUrls: ['./expanded-shopping-cart.component.scss']
})
export class ExpandedShoppingCartComponent implements OnInit {
  imagePath = environment.image_path;
  trashAlt = faTrashAlt;
  shoppingCartItems$: Observable<CartItem[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.shoppingCartItems$ = this.store.select(selectSelectedItemsState);
    // this.store.select('shoppingCart').subscribe(shoppingCartState => {
    //   this.shoppingCartItems = shoppingCartState.selectedItems;
    // });
  }

  getTotal() {
    return this.store.select(selectSelectedItemsTotalState);
    // return this.shoppingCartItems$.subscribe(
    //   (items) => {
    //     return items.reduce((acc, item) => acc + item.product.pricing.price, 0);

    //   }
    // );

  }

  removeFormShoppingCart(item){
    this.store.dispatch(  RemoveItemFromShoppingCart({ item }) );
  }

  checkout() {
    this.store.dispatch( Checkout() )
  }

}
