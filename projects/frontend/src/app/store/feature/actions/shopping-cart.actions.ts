import { CartItem } from './../../../models/cartItem';
import { Product } from './../../../models/product';
import { createAction, props } from '@ngrx/store';


export const LoadShoppingCarts = createAction(
  '[ShoppingCart] Load ShoppingCarts'
);

export const LoadShoppingCartsSuccess = createAction(
  '[ShoppingCart] Load ShoppingCarts Success',
  props<{ items: CartItem[] }>()
);

export const LoadShoppingCartForUnAuthenticatedUser = createAction(
  '[ShoppingCart] Load ShoppingCart Form unAuthenticated User',
);

export const LoadShoppingCartForUnAuthenticatedUserSuccess = createAction(
  '[ShoppingCart] Load ShoppingCart Form unAuthenticated User',
  props<{ items: CartItem[] }>()
);

export const LoadWishlistForUnAuthenticatedUser = createAction(
  '[Wishlist] Load Wishlist Form unAuthenticated User',
);

export const LoadWishlistForUnAuthenticatedUserSuccess = createAction(
  '[Wishlist] Load Wishlist Form unAuthenticated User',
  props<{ items: CartItem[] }>()
);

export const AddItemToShoppingCart = createAction(
  '[ShoppingCart]  Add Item',
  props<{
    item: CartItem
  }>()
);

export const AddItemToShoppingCartSuccess = createAction(
  '[ShoppingCart]  Add Item Success',
  props<{
    item: CartItem
  }>()
);

export const RemoveItemFromShoppingCart = createAction(
  '[ShoppingCart] Remove Item From Shopping Cart',
  props<{ item: CartItem}>()
);

export const RemoveItemFromShoppingCartSuccess = createAction(
  '[ShoppingCart] Remove Item From Shopping Cart Success',
  props<{ item: CartItem }>()
);


/**
 * WishList
 */
export const LoadWishList = createAction(
  '[Wishlist] Load WishList'
);

export const LoadWishListSuccess = createAction(
  '[Wishlist] Load WishList Success',
  props<{ items: CartItem[] }>()
);

export const AddItemToWishlist = createAction(
  '[Wishlist] Add Item To Wishlist',
  props<{ item: CartItem}>()
);

export const AddItemToWishlistSuccess = createAction(
  '[Wishlist] Add Item To Wishlist Success',
  props<{ item: CartItem}>()
);


export const RemoveItemFromWishlist = createAction(
  '[Wishlist] Remove Item From Wishlist',
  props<{ item: CartItem}>()
);

export const RemoveItemFromWishlistSuccess = createAction(
  '[Wishlist] Remove Item From Wishlist Success',
  props<{ item: CartItem }>()
);


export const Checkout = createAction(
  '[Checkout] Checkout',
);

export const CheckoutSuccess = createAction(
  '[Checkout] Checkout Success'
)


export const NoActionFaliure = createAction(
  '[Shopping Cart Wishlist] No Action'
);


