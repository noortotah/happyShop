import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShoppingCart from '../reducers/shopping-cart.reducer';

export const selectShoppingCartState = createFeatureSelector<fromShoppingCart.State>(
  fromShoppingCart.shoppingCartFeatureKey
);


export const selectSelectedItemsState = createSelector(
  selectShoppingCartState,
  (state: fromShoppingCart.State) => state.selectedItems
);

export const selectSelectedItemsTotalState = createSelector(
  selectSelectedItemsState,
  (state) => state.reduce((acc, item) => acc + +item.product.pricing.price, 0)
);


export const selectUserWishlistState = createSelector(
  selectShoppingCartState,
  (state: fromShoppingCart.State) => state.userWishlist
);

export const selectWishlistProductsIdsState = createSelector(
  selectShoppingCartState,
  (state: fromShoppingCart.State) => state.userWishlist.map( item => item.product._id)
);


export const IsWished = createSelector(
  selectWishlistProductsIdsState,
  (item, {productId}) => {
    return item.includes(productId);
  }
);
