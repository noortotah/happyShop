import { CartItem } from './../../../models/cartItem';
import { Product } from './../../../models/product';
import { createReducer, on } from '@ngrx/store';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';

export const shoppingCartFeatureKey = 'shoppingCart';

export interface State {
  selectedItems: CartItem[];
  userWishlist: CartItem[];
  // wishlistProductsIds: Array<string>;
}

export const initialState: State = {
  selectedItems : [],
  userWishlist : [],
};


export const reducer = createReducer(
  initialState,

  // /**
  // * Load Shopping Cart and Wishlist from Authenticated User
  // */
  // on(ShoppingCartActions.LoadShoppingCartForUnAuthenticatedUserSuccess, (state, {items}) => {
  //   console.log(items);
  //   return {
  //     ...state,
  //     selectedItems : items.map( item => { return {...item} })
  //   };
  // }),

  // on(ShoppingCartActions.LoadShoppingCartForUnAuthenticatedUserSuccess, (state, {items}) => {
  //   console.log(items);
  //   return {
  //     ...state,
  //     userWishlist : items.map( item => { return {...item} })
  //   };
  // }),



  /**
   * Shopping Cart
   */

  on(ShoppingCartActions.LoadShoppingCartsSuccess, (state, {items}) => {
    return {
      ...state,
      selectedItems : items.map( item => { return {...item} })
    };
  }),
  on(ShoppingCartActions.AddItemToShoppingCartSuccess, (state, action) => {
    return {
      ...state,
      selectedItems: [...state.selectedItems, {...action.item}]
    };
  }),
  on(ShoppingCartActions.RemoveItemFromShoppingCartSuccess, (state, action) => {

    return {
       ...state,
       selectedItems: [...state.selectedItems.filter(element => { return element._id !== action.item._id})]
     };
   }),

  /**
   * WishList
   */
  on(ShoppingCartActions.LoadWishListSuccess, (state, {items}) => {
    return {
      ...state,
      userWishlist : items.map( item => { return {...item} })
    };
  }),
  on(ShoppingCartActions.AddItemToWishlistSuccess, (state, action) => {
    return {
      ...state,
      userWishlist: [...state.userWishlist, {...action.item}]
    };
  }),
  on(ShoppingCartActions.RemoveItemFromWishlistSuccess, (state, action) => {

   return {
      ...state,
      userWishlist: [...state.userWishlist.filter(element => { return element._id !== action.item._id})]
    };
  }),
  /**
   * Checkout
   */
  on(ShoppingCartActions.CheckoutSuccess, (state, action) => {

    return {
       ...state,
       selectedItems: []
     };
   }),
);

