import { Order } from './../../../models/order';
import { LoadShopCategoriesSuccess } from './../actions/app.actions';
import { Product } from './../../../models/product';
import { Category } from './../../../models/category';
import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';

export const appFeatureKey = 'app';

export interface State {
  categories: Category[];
  products: Product[];
  adminProducts: Product[],
  adminCategories: Category[],
  categoryProducts: Product[],
  adminOrders: Order[]

}

export const initialState: State = {
  categories: [],
  products: [],
  adminProducts: [],
  adminCategories: [],
  categoryProducts: [],
  adminOrders: []
};


export const reducer = createReducer(
  initialState,

  /**
   * Admin Products
   */
  on(AppActions.AddProductSuccess, (state, {id, product}) => {
    return {
      ...state,
      adminProducts: [...state.adminProducts, { id, ...product}]
    }
  }),
  on(AppActions.LoadProductsForAdminSuccess, (state, { products }) => {
      return {
        ...state,
        adminProducts : [...products]
      };
    }),
  on(AppActions.LoadOrdersForAdminSuccess, (state, { orders }) => {
    return {
      ...state,
      adminOrders : [...orders]
    };
  }),
  on(AppActions.RemoveItemFromProductsSuccess, (state, {productId}) => {
    console.log(productId);
    return {
      ...state,
      adminProducts: [...state.adminProducts.filter( (element) => element._id !== productId )]
    };
  }),
  on(AppActions.EditItemInProductsSuccess, (state, {product}) => {
    const newAdminProducts = [...state.adminProducts];
    newAdminProducts[newAdminProducts.findIndex(x => x._id == product._id)] = product;
    console.log(product, newAdminProducts);
    return {
      ...state,
      adminProducts: newAdminProducts
    };
  }),

  /**
   * Admin Categories
   */

  on(AppActions.AddCategorySuccess, (state, {id, category}) => {
    return {
      ...state,
      adminCategories: [...state.adminCategories, { _id: id, ...category}]
    }
  }),
  on(AppActions.LoadCategoriesForAdminSuccess, (state, { categories }) => {
    console.log(categories);
      return {
        ...state,
        adminCategories : [...categories]
      };
    }),
  on(AppActions.RemoveItemFromCategoriesSuccess, (state, {categoryId}) => {
    console.log(categoryId);
    return {
      ...state,
      adminCategories: [...state.adminCategories.filter( (element) => element._id !== categoryId )]
    };
  }),
  on(AppActions.EditItemInCategoriesSuccess, (state, {category}) => {
    const newAdminCategories = [...state.adminCategories];
    newAdminCategories[newAdminCategories.findIndex(x => x._id == category._id)] = category;
    console.log(category, newAdminCategories);
    return {
      ...state,
      adminCategories: newAdminCategories
    };
  }),
  /**
   * Shop Products
   */
  on(AppActions.LoadShopProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products : [...products]
    };
  }),
  on(AppActions.LoadShopProductsByCategorySuccess, (state, { products }) => {

    return {
      ...state,
      categoryProducts : [...products]
    };
  }),

  /**
   * Shop Categories
   */
  on(AppActions.LoadShopCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories : [...categories]
    };
  }),

);

