// import { loadCategoriesSuccess } from './feature/actions/app.actions';
// import { Store } from '@ngrx/store';
// import { element } from 'protractor';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { Category } from './../models/category';
// import { Injectable } from '@angular/core';
// import { AngularFirestore, DocumentChangeAction, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
// import { Product } from '../models/product';
// import { AppState } from '.';

// @Injectable({
//   providedIn: 'root'
// })
// export class AppService {
//   categoryCollection =  this.firestore.collection<Category>('categories');
//   productCollection =   this.firestore.collection<Product>('products');

//   loadProducts(): Observable<DocumentChangeAction<Product>[]>{
//    return this.productCollection.snapshotChanges();

//   }

//   addProduct(product: Product) {
//     product.categories.map( categoryId => {
//     } );
//     return  this.firestore.collection('products').add(
//       {
//         ...product,
//         categories: [ ...product.categories.map( categoryId => this.categoryCollection.doc(`/categories/${categoryId}`) )]
//       }
//     );
//   }



//   addCategory(category): Promise<any>{
//     const {subCategories, ...categoryObj} = category;
//     return  this.categoryCollection.add(categoryObj).then(documentReference => {
//       subCategories.forEach(subCat => {
//         documentReference.collection('subCategories').add(subCat);
//       });
//     });
//   }

//   // async getSubCategory(id: string) {
//   //   let subCategoriesArray: Category[] = [];
//   //   await this.categoryCollection.doc(id).collection('subCategories')
//   //             .snapshotChanges()
//   //             .subscribe(subCategories => {
//   //               subCategories.map( subCat => {
//   //                 subCategoriesArray.push({
//   //                   id: subCat.payload.doc.id,
//   //                   ...subCat.payload.doc.data() as Category
//   //                 });
//   //               });
//   //               console.log('subcategories', subCategoriesArray);
//   //               return subCategoriesArray;
//   //             });

//   // }

//   editCategory(id, category): Promise<void> {
//     return this.firestore.collection('categories')
//         .doc(id)
//         .update(category);
//   }

//   deleteCategory(id): Promise<void> {
//     return this.firestore.collection('categories').doc(id).delete();
//   }


// constructor(private firestore: AngularFirestore, private store: Store<AppState>) { }
// }
