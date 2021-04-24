import { LoadShoppingCartForUnAuthenticatedUser } from './../actions/shopping-cart.actions';
import { Router } from '@angular/router';
import { CartItem } from './../../../models/cartItem';
import { Product } from './../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ShoppingCartActions from '../actions/shopping-cart.actions';
import { environment } from 'projects/frontend/src/environments/environment';

@Injectable()
export class ShoppingCartEffects {

  // @Effect()
  // loadShoppingCartForUnAuthenticatedUser$ = this.actions$.pipe(
  //     ofType(ShoppingCartActions.LoadShoppingCartForUnAuthenticatedUser),
  //     map( () => {
  //       const user = JSON.parse( localStorage.getItem('user') );
  //       console.log(user.cart.items);
  //     })
  // );

  @Effect()
  loadShoppingCart$ = this.actions$.pipe(
      ofType(ShoppingCartActions.LoadShoppingCarts),
      switchMap(actionData => {
        return this.httpClient.get(environment.backend_url+ 'users/getCart')
                              .pipe(
                                  map((response: { items: CartItem[], success:boolean}) => ShoppingCartActions.LoadShoppingCartsSuccess({ items: response.items})),
                                  catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                              );
      })
  );

  @Effect()
  addItemToShoppingCart$ = this.actions$.pipe(
      ofType(ShoppingCartActions.AddItemToShoppingCart),
      switchMap(actionData => {
        return this.httpClient.post(environment.backend_url+ 'users/addToShoppingCart', actionData.item)
                              .pipe(
                                  map((response: {success:boolean, itemId: string}) => {
                                    return ShoppingCartActions.AddItemToShoppingCartSuccess({ item: { _id: response.itemId, ...actionData.item } })
                                  }),
                                  catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                              );
      })
  );

  @Effect()
  removeItemFromShoppingCart$ = this.actions$.pipe(
    ofType(ShoppingCartActions.RemoveItemFromShoppingCart),
    switchMap(actionData => {
      return this.httpClient.post(environment.backend_url+ 'users/removeFromShoppingCart', {itemId: actionData.item._id})
                            .pipe(
                                map((response: { success:boolean }) => {
                                  return ShoppingCartActions.RemoveItemFromShoppingCartSuccess({ item: actionData.item })
                                }),
                                catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                            );
    })
  );


  /**
   * WishList
   */

  @Effect()
  loadWishList$ = this.actions$.pipe(
      ofType(ShoppingCartActions.LoadWishList),
      switchMap(actionData => {
        return this.httpClient.get(environment.backend_url+ 'users/getWishlist')
                              .pipe(
                                  map((response: { items: CartItem[], success:boolean}) => ShoppingCartActions.LoadWishListSuccess({ items: response.items})),
                                  catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                              );
      })
  );

  @Effect()
  addItemToWishlist$ = this.actions$.pipe(
      ofType(ShoppingCartActions.AddItemToWishlist),
      switchMap(actionData => {
        return this.httpClient.post(environment.backend_url+ 'users/addToWishlist', actionData.item)
                              .pipe(
                                  map((response: {success:boolean, itemId: string}) => {
                                    return ShoppingCartActions.AddItemToWishlistSuccess({ item: { _id: response.itemId, ...actionData.item }})
                                  }),
                                  catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                              );
      })
  );

  @Effect()
  removeItemFromWishlist$ = this.actions$.pipe(
    ofType(ShoppingCartActions.RemoveItemFromWishlist),
    switchMap(actionData => {
      return this.httpClient.post(environment.backend_url +'users/removeFromWishlist', {itemId: actionData.item._id})
                            .pipe(
                                map((response: { success:boolean }) => {
                                  return ShoppingCartActions.RemoveItemFromWishlistSuccess({ item: actionData.item })
                                }),
                                catchError( error => of(ShoppingCartActions.NoActionFaliure()))
                            );
    })
  );

    /**
   * Checkout
   */
  @Effect()
  checkout$ = this.actions$.pipe(
      ofType(ShoppingCartActions.Checkout),
      switchMap(actionData => {
        return this.httpClient.post(environment.backend_url+ 'users/addOrder', {})
                              .pipe(
                                  map((response) => ShoppingCartActions.CheckoutSuccess()),
                                  catchError( error => of(ShoppingCartActions.NoActionFaliure( )))
                              );
      })
  );

  @Effect({dispatch: false})
  checkoutSuccess$ = this.actions$.pipe(
      ofType(ShoppingCartActions.CheckoutSuccess),
      tap( CheckoutSuccessData => {
        this.router.navigate(['/landing/checkout-success']);
      })
  );
  constructor(private actions$: Actions,
              private router: Router,
              private httpClient: HttpClient) {}

}
