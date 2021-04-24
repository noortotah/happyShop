import { environment } from 'projects/frontend/src/environments/environment';
import { Category } from './../../../models/category';
import { Product } from './../../../models/product';
import { Router } from '@angular/router';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AppActions from '../actions/app.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { Order } from '../../../models/order';

const convertOBjToFormData = (product) => {
  var formData = new FormData();
    // console.log(product.title)
    // console.log(product.images)
    formData.append('title', product.title);
    formData.append('sku', product.sku)
    formData.append('quantity', product.quantity)
    formData.append('description', product.description)
    formData.append('pricing', JSON.stringify(product.pricing))
    formData.append('manufacture_details', JSON.stringify(product.manufacture_details))
    formData.append('shipping_details', JSON.stringify(product.shipping_details))
    formData.append('images', product.images)
    formData.append('variation_quantity', '')
    formData.append('outofStock', JSON.stringify(!product.quantity) )
    formData.append('categories', JSON.stringify(product.categories))
    formData.append('variations', JSON.stringify(product.variations))
 return formData;
}

@Injectable()
export class AppEffects {
  /**
   *  Admin Products Effects
   */
  @Effect()
  addProduct$ = this.actions$.pipe(
      ofType(AppActions.AddItemToProducts),
      switchMap(actionData => {
        const formData = convertOBjToFormData(actionData.product);
        const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
        return this.httpClient.post( environment.backend_url + 'trythis', formData, { headers: headers })
                              .pipe(
                                  map((response: {productId:string, success:boolean}) => AppActions.AddProductSuccess({id: response.productId, product: actionData.product })),
                                  catchError( error => of(AppActions.AddProductFailure({ error })))
                              );
      })
  );

  @Effect({dispatch: false})
  addProductSuccess$ = this.actions$.pipe(
      ofType(AppActions.AddProductSuccess),
      tap( addProductSuccessData => {
        this.router.navigate(['/admin/products']);
      })
  );

  @Effect()
  editProduct$ = this.actions$.pipe(
      ofType(AppActions.EditItemInProducts),
      switchMap(actionData => {
        const formData = convertOBjToFormData(actionData.product);
        return this.httpClient.put(environment.backend_url + 'admin/products/' + actionData.product._id, formData)
                              .pipe(
                                  tap(response => console.log('respnose',response)),
                                  map((response: {success:boolean}) => AppActions.EditItemInProductsSuccess({product: actionData.product })),
                                  catchError( error => of(AppActions.AddCategoryFailure({ error })))
                              );
      })
  );

  @Effect({dispatch: false})
  editProductSuccess$ = this.actions$.pipe(
      ofType(AppActions.EditItemInProductsSuccess),
      tap( editProductSuccessData => {
        this.router.navigate(['/admin/products']);
      })
  );

  @Effect()
  loadProductsForAdmin$ = this.actions$.pipe(
      ofType(AppActions.LoadProductsForAdmin),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url + 'admin/products')
                              .pipe(
                                  map((response: {products:Product[], success:boolean}) => AppActions.LoadProductsForAdminSuccess({products: response.products})),
                                  catchError( error => of(AppActions.LoadProductsForAdminFailure({ error })))
                              );
      })
  );

  @Effect()
  loadOrdersForAdmin$ = this.actions$.pipe(
      ofType(AppActions.LoadProductsForAdmin),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url + 'admin/orders')
                              .pipe(
                                  map((response: {orders:Order[], success:boolean}) => AppActions.LoadOrdersForAdminSuccess({orders: response.orders})),
                                  catchError( error => of(AppActions.LoadProductsForAdminFailure({ error })))
                              );
      })
  );


  @Effect()
  removeProduct$ = this.actions$.pipe(
      ofType(AppActions.RemoveItemFromProducts),
      switchMap(actionData => {
        return this.httpClient.delete( environment.backend_url + 'admin/products/' + actionData.productId)
                              .pipe(
                                  map((response) => AppActions.RemoveItemFromProductsSuccess({productId: actionData.productId} )),
                                  catchError( error => of(AppActions.RemoveItemFromProductsFailure({ error })))
                              );
      })
  );

  /**
   * Admin Categories Effects
   */

  @Effect()
  addCategory$ = this.actions$.pipe(
      ofType(AppActions.AddItemToCategories),
      switchMap(actionData => {
        return this.httpClient.post( environment.backend_url + 'admin/categories', actionData.category)
                              .pipe(
                                  map((response: {categoryId:string, success:boolean}) => AppActions.AddCategorySuccess({id: response.categoryId, category: actionData.category })),
                                  catchError( error => of(AppActions.AddCategoryFailure({ error })))
                              );
      })
  );

  @Effect()
  editCategory$ = this.actions$.pipe(
      ofType(AppActions.EditItemInCategories),
      switchMap(actionData => {
        return this.httpClient.put( environment.backend_url + 'admin/categories/' + actionData.category._id, actionData.category)
                              .pipe(
                                  map((response: {success:boolean}) => AppActions.EditItemInCategoriesSuccess({category: actionData.category })),
                                  catchError( error => of(AppActions.AddCategoryFailure({ error })))
                              );
      })
  );

  @Effect()
  loadCategoriesForAdmin$ = this.actions$.pipe(
      ofType(AppActions.LoadCategoriesForAdmin),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url + 'admin/categories')
                              .pipe(
                                  map((response: {categories:Category[], success:boolean}) => AppActions.LoadCategoriesForAdminSuccess({categories: response.categories})),
                                  catchError( error => of(AppActions.LoadCategoriesForAdminFailure({ error })))
                              );
      })
  );


  @Effect()
  removeCategory$ = this.actions$.pipe(
      ofType(AppActions.RemoveItemFromCategories),
      switchMap(actionData => {
        return this.httpClient.delete( environment.backend_url + 'admin/categories/' + actionData.categoryId)
                              .pipe(
                                  map((response) => AppActions.RemoveItemFromCategoriesSuccess({categoryId: actionData.categoryId} )),
                                  catchError( error => of(AppActions.RemoveItemFromCategoriesFailure({ error })))
                              );
      })
  );



  /**
   * Shop Products
   */
  @Effect()
  loadShopProducts$ = this.actions$.pipe(
      ofType(AppActions.LoadShopProducts),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url + 'products')
                              .pipe(
                                  map((response: {products:Product[], success:boolean}) => AppActions.LoadShopProductsSuccess({products: response.products})),
                                  catchError( error => of(AppActions.LoadShopProductsFailure({ error })))
                              );
      })
  );
  @Effect()
  loadShopProductsByCategory$ = this.actions$.pipe(
      ofType(AppActions.LoadShopProductsByCategory),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url+ 'products/fetchProductsByCategory/' + actionData.categoryId)
                              .pipe(
                                  map((response: {products:Product[], success:boolean}) => AppActions.LoadShopProductsByCategorySuccess({products: response.products})),
                                  catchError( error => of(AppActions.LoadShopProductsFailure({ error })))
                              );
      })
  );



  @Effect({dispatch: false})
  loadShopProductFailure$ = this.actions$.pipe(
      ofType(AppActions.LoadShopProductsFailure),
      tap( LoadShopProductsFailureData => {
        this.router.navigate(['/']);
      })
  );


   /**
   * Shop Categories
   */
  @Effect()
  loadShopCategories$ = this.actions$.pipe(
      ofType(AppActions.LoadShopCategories),
      switchMap(actionData => {
        return this.httpClient.get( environment.backend_url + 'categories')
                              .pipe(
                                  map((response: {categories:Category[], success:boolean}) => AppActions.LoadShopCategoriesSuccess({categories: response.categories})),
                                  catchError( error => of(AppActions.LoadShopProductsFailure({ error })))
                              );
      })
  );

  @Effect({dispatch: false})
  loadShopCategoriesFailure$ = this.actions$.pipe(
      ofType(AppActions.LoadShopCategoriesFailure),
      tap( LoadShopCategoriesFailureData => {
        this.router.navigate(['/']);
      })
  );



  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router) {}

}
