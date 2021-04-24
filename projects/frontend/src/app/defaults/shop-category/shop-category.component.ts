import { selectCategoryProductsState } from './../../store/feature/selectors/app.selectors';
import { LoadShopProductsByCategory } from './../../store/feature/actions/app.actions';
import { selectCategoriesState } from '../../store/feature/selectors/app.selectors';
import { Category } from '../../models/category';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../models/product';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppState } from '../../store/index';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShopCategoryComponent implements OnInit {
  CategoryId: string;
  isOpen = false;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  // categories = [
    // { name: 'Shoes', subCategories: [
    //   { name: 'View All'},
    //   { name: 'Pumps & High Heels'},
    //   { name: 'Ballerinas & Flats'},
    //   { name: 'Sandals'},
    //   { name: 'Sneakers'},
    //   { name: 'Boots'},
    // ]},
    // { name: 'Clothing', subCategories: [
    //   { name: 'View All'},
    //   { name: 'Blazers & Suits'},
    //   { name: 'Blouses'},
    //   { name: 'Cardigans & Jumpers'},
    //   { name: 'Dresses'},
    //   { name: 'Hoodies & Sweatshirts'},
    //   { name: 'Jackets & Coats'},
    // ]},
    // { name: 'Bags', subCategories: []},
    // { name: 'Sunglasses', subCategories: []},
    // { name: 'Watches', subCategories: []},
    // { name: 'Accessories', subCategories: []},

  // ];
  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(selectCategoriesState);
    console.log(this.categories$);
    this.activatedRoute.queryParams.pipe(
      map(
      qParams => {
          this.CategoryId = qParams.search;
          return this.CategoryId;
        }
      )
    ).subscribe(
      categoryId => {
        this.store.dispatch(LoadShopProductsByCategory({categoryId}));
        this.products$ = this.store.pipe(select(selectCategoryProductsState));
        console.log('this is subscribe for work');
      }
    );
  }




}
