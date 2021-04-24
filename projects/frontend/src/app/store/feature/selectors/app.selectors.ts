import { Product } from './../../../models/product';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../reducers/app.reducer';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectAdminProductsState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.adminProducts
);

export const selectAdminOrdersState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.adminOrders
);



export const selectAdminProductdyIDState = createSelector(
  selectAppState,
  (state: fromApp.State, {productId}) => { const v = { ...state.adminProducts.find(x =>  { return x._id == productId} )};  return v}
);

export const selectAdminCategoriesState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.adminCategories
);


export const selectProductsState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.products
);

export const selectCategoryProductsState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.categoryProducts
);

export const selectProductsLength = createSelector(
  selectAppState,
  (state: fromApp.State) => state.products.length
);



export const selectHoodiesState = createSelector(
  selectProductsState,
  (products: Product[]) => products.filter( product => product.categories.includes('60587caae9bcdee4aba0c22c'))
);

export const selectCategoriesState = createSelector(
  selectAppState,
  (state: fromApp.State) => state.categories
);

