import { environment } from 'projects/frontend/src/environments/environment';

import { Product } from '../../models/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/index';
import { AddItemToShoppingCart } from '../../store/feature/actions/shopping-cart.actions';

@Component({
  selector: 'app-quick-product-view-modal',
  templateUrl: './quick-product-view-modal.component.html',
  styleUrls: ['./quick-product-view-modal.component.scss']
})
export class QuickProductViewModalComponent implements OnInit {
  imagePath = environment.image_path;

  @Input() product: Product;
  @Output() modalDismiss = new EventEmitter<boolean>();
  selectedVariation:  Array<{id: number,type: string,  value: string}> = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initSelected();
   }

   initSelected () {
    this.selectedVariation = [];
    this.product.variations.forEach( (variation, index) => {
      this.selectedVariation.push({ id: 0, type: variation.type, value: variation.values[0] })
    });
  }

  addToCard() {
    const item: any = {
      productId: this.product._id,
      product: this.product,
      selectedVariation: this.selectedVariation
    };

    this.store.dispatch( AddItemToShoppingCart( {item} ) );
    this.initSelected();
    console.log('heeree before emit');
    this.modalDismiss.emit(true);
  }

  changeVariation(event) {
    const eventId = (event.target.id || event.target.options[event.target.selectedIndex].id);
    const variationIndex = eventId.split('-')[4];

    this.selectedVariation[variationIndex] = {
        id : +eventId.split('-')[3],
        type: this.product.variations[variationIndex].type,
        value: event.target.value
    };
  }


}
