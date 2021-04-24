import { CartItem } from './../../models/cartItem';
import { RemoveItemFromWishlist } from './../../store/feature/actions/shopping-cart.actions';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/index';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishListItems: {product: Product, selectedVariation: Array<{id: number,type: string,  value: string}>, selectedColor?: {id: number, value: string} }[];
  trashAlt = faTrashAlt;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('shoppingCart').subscribe(
      shoppingCartState => {
        this.wishListItems = shoppingCartState.userWishlist;
      }
    );
  }

  removeFormWishlist(item: CartItem){
    this.store.dispatch(  RemoveItemFromWishlist({ item }) );
  }

}
