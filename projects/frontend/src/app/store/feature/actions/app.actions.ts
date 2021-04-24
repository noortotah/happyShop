import { Category } from './../../../models/category';
import { Product } from './../../../models/product';
import { createAction, props } from '@ngrx/store';
import { Order } from '../../../models/order';


export const AddItemToProducts = createAction(
  '[Products] Add Product',
  props<{ product: Product }>()
);
export const AddProductSuccess = createAction(
  '[Products] Add Product Success',
  props<{ id: string, product: Product }>()
);

export const AddProductFailure = createAction(
  '[Products] Add Product Failure',
  props<{ error: any }>()
);

export const EditItemInProducts = createAction(
  '[Products] Edit Product',
  props<{product: Product}>()
);

export const EditItemInProductsSuccess = createAction(
  '[Products] Edit Product Success',
  props<{ product: Product}>()
);

export const LoadProductsForAdmin = createAction(
  '[Products] Load Products For Admin',
);

export const LoadProductsForAdminSuccess = createAction(
  '[Products] Load Products For Admin Success',
  props<{ products: Product[] }>()
);

export const LoadProductsForAdminFailure = createAction(
  '[Products] Load Products For Admin Failure',
  props<{ error: any }>()
);

export const RemoveItemFromProducts = createAction(
    '[Products] Remove Product',
    props<{ productId: string}>()
  );

export const RemoveItemFromProductsSuccess = createAction(
  '[Products] Remove Item From Products Success',
  props<{ productId: string }>()
);

export const RemoveItemFromProductsFailure = createAction(
  '[Products] Remove Item From Products Failure',
  props<{ error: any }>()
);

// SHOP

export const LoadShopProducts = createAction(
  '[Shop Products] Load Products For Shop',
);

export const LoadShopProductsSuccess = createAction(
  '[Shop Products] Load Products For Shop Success',
  props<{ products: Product[] }>()
);

export const LoadShopProductsFailure = createAction(
  '[Shop Products] Load Products For Shop Failure',
  props<{ error: any }>()
);

export const LoadShopProductsByCategory = createAction(
  '[Shop Products] Load Products For Shop By Category',
  props<{ categoryId: string }>()
);

export const LoadShopProductsByCategorySuccess = createAction(
  '[Shop Products] Load Products For Shop By Category Success',
  props<{ products: Product[] }>()
);

export const LoadShopCategories = createAction(
  '[Shop Categories] Load Categories For Shop',
);

export const LoadShopCategoriesSuccess = createAction(
  '[Shop Categories] Load Categories For Shop Success',
  props<{ categories: Category[] }>()
);

export const LoadShopCategoriesFailure = createAction(
  '[Shop Categories] Load Categories For Shop Failure',
  props<{ error: any }>()
);


/**
 * Categories
 */

export const AddItemToCategories = createAction(
  '[Categories] Add Category',
  props<{ category: Category}>()
);
export const AddCategorySuccess = createAction(
  '[Categories] Add Product Success',
  props<{ id: string, category: Category }>()
);

export const AddCategoryFailure = createAction(
  '[Categories] Add Category Failure',
  props<{ error: any }>()
);

export const LoadCategoriesForAdmin = createAction(
  '[Categories] Load Categories For Admin',
);

export const LoadCategoriesForAdminSuccess = createAction(
  '[Categories] Load Categories For Admin Success',
  props<{ categories: Category[] }>()
);

export const LoadCategoriesForAdminFailure = createAction(
  '[Categories] Load Categories For Admin Failure',
  props<{ error: any }>()
);

export const EditItemInCategories = createAction(
  '[Categories] Edit Category',
  props<{category: Category}>()
);

export const EditItemInCategoriesSuccess = createAction(
  '[Categories] Edit Category Success',
  props<{ category: Category}>()
);


export const RemoveItemFromCategories = createAction(
    '[Categories] Remove Category',
    props<{ categoryId: string}>()
  );

export const RemoveItemFromCategoriesSuccess = createAction(
  '[Categories] Remove Item From Categories Success',
  props<{ categoryId: string }>()
);

export const RemoveItemFromCategoriesFailure = createAction(
  '[Categories] Remove Item From Categories Failure',
  props<{ error: any }>()
);

export const LoadOrdersForAdmin = createAction(
  '[Orders] Load Orders For Admin',
);

export const LoadOrdersForAdminSuccess = createAction(
  '[Orders] Load Orders For Admin Success',
  props<{ orders: Order[] }>()
);

// export const loadProducts = createAction(
//   '[Products] Load Products',
// );

// export const loadProductsSuccess = createAction(
//   '[Products] Load Products Success',
//   props<{ products: Product[] }>()
// );

// export const loadProductsFailure = createAction(
//   '[Products] Load Products Failure',
//   props<{ error: any }>()
// );



// export const RemoveItemFromProducts = createAction(
//   '[Products] RemoveItem',
//   props<{ index: number, productId: string}>()
// );

// export const EditItemInProducts = createAction(
//   '[Products] EditItem',
//   props<{ index: number, product: Product}>()
// );





// export const loadCategories = createAction(
//   '[App] Load Categories',
// );


// export const loadCategorySuccess = createAction(
//   '[Categories] Load Category Success',
//   props<{ category: Category }>()
// );

// export const loadCategoriesSuccess = createAction(
//   '[Categories] Load Categories Success',
//   props<{ categories: Category[] }>()
// );

// export const loadCategoriesFailure = createAction(
//   '[Categories] Load Categories Failure',
//   props<{ error: any }>()
// );

// export const AddItemToCategories = createAction(
//   '[Categories] AddItem',
//   props<{ category: Category}>()
// );

// export const RemoveItemFromCategories = createAction(
//   '[Categories] RemoveItem',
//   props<{index: number, categoryId: string}>()
// );

// export const EditItemInCategories = createAction(
//   '[Categories] EditItem',
//   props<{ index: number, category: Category}>()
// );

// export const loadApps = createAction(
//   '[App] Load Apps',
// );

// export const loadAppsSuccess = createAction(
//   '[App] Load Apps Success',
//   props<{ data: any }>()
// );

// export const loadAppsFailure = createAction(
//   '[App] Load Apps Failure',
//   props<{ error: any }>()
// );

// export const RemoveItemToProducts = createAction(
//   '[Products] RemoveItem',
//   props<{ index: number}>()
// );


// export const loadEmptySuccess = createAction(
//   '[App] Success'
// );
