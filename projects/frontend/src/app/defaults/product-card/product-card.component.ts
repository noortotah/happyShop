import { environment } from 'projects/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { IsWished } from '../../store/feature/selectors/shopping-cart.selectors';
import { QuickProductViewModalComponent } from '../quick-product-view-modal/quick-product-view-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../store/index';
import { select, Store } from '@ngrx/store';
import {  faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import {  faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { AddItemToShoppingCart, AddItemToWishlist } from '../../store/feature/actions/shopping-cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  imagePath = environment.image_path;
  @Input() product: Product;
  @Input() isCarousel = false;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;

  isWished$: Observable<boolean>;

  selectedVariation: Array<{id: number, type: string,  value: string}> = [];
  selectedColor: {id: number, value: string};


  constructor(private modalService: NgbModal, private store: Store<AppState>) { }

  ngOnInit(): void {

    // this.isWished = this.store.select(IsWished);
    this.isWished$ = this.store.pipe(select(IsWished, { productId: this.product._id }));
    // this.isWished = this.store.select(IsWished(this.product));
    // this.store.select('shoppingCart').subscribe(shoppingCartState => {
    //   this.isWished = shoppingCartState.wishlistProductsIds.includes(this.product.id)
    //   // this.isWished = shoppingCartState.userWishlist..includes(this.product);
    // });
    this.initSelected();
   }

  initSelected() {
    this.selectedVariation = [];
    this.product.variations.forEach( (variation, index) => {
      this.selectedVariation.push({ id: 0, type: variation.type, value: variation.values[0] });
    });
  }
  openProductView() {
    const modal = this.modalService.open(
        QuickProductViewModalComponent,
        {
          size: 'lg',
        }
      );

    modal.componentInstance.product = this.product;
    modal.componentInstance.modalDismiss.subscribe($e => {
        modal.close();
      });


  }

  // tslint:disable-next-line: typedef
  addToCard() {
    const item: any = {

      productId: this.product._id,
      product: this.product,
      selectedVariation: this.selectedVariation
    };
    console.log('compoennt  ',item);

    this.store.dispatch( AddItemToShoppingCart({item}) );
    // this.initSelected();
  }

  changeVariation(event) {
    const eventId = (event.target.id || event.target.options[event.target.selectedIndex].id);
    const variationIndex = eventId.split('-')[3];

    this.selectedVariation[variationIndex] = {
        id : +eventId.split('-')[2],
        type: this.product.variations[variationIndex].type,
        value: event.target.value
    };

  }

  // tslint:disable-next-line: typedef
  addToWishList(product: Product){
    console.log('addToWishlist', product);
    const item: any = {
      productId: this.product._id,
      product: this.product,
      selectedVariation: this.selectedVariation
    };
    this.store.dispatch( AddItemToWishlist({item}) );
  }
}
