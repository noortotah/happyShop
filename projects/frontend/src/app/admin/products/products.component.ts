import { environment } from 'projects/frontend/src/environments/environment';
import { selectAdminProductsState } from './../../store/feature/selectors/app.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Product } from '../../models/product';
import { LoadProductsForAdmin, RemoveItemFromProducts } from '../../store/feature/actions/app.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  imagePath = environment.image_path;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(LoadProductsForAdmin());
    this.products$ = this.store.select(selectAdminProductsState);
  }

  deleteProduct(productId: string): void{
    this.store.dispatch( RemoveItemFromProducts({productId}) );
  }

}
