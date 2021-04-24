import { WishlistComponent } from './../../defaults/wishlist/wishlist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopCategoryComponent } from '../../defaults/shop-category/shop-category.component';
import { ExpandedShoppingCartComponent } from '../../defaults/expanded-shopping-cart/expanded-shopping-cart.component';
import { ProductCardComponent } from '../../defaults/product-card/product-card.component';
import { QuickProductViewModalComponent } from '../../defaults/quick-product-view-modal/quick-product-view-modal.component';
import { ShopComponent } from '../../defaults/shop/shop.component';
import { ComponentsModule } from './../../theme-components/components/components.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { NgbAccordionModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ShopComponent,
    QuickProductViewModalComponent,
    ProductCardComponent,
    ExpandedShoppingCartComponent,
    ShopCategoryComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    DefaultLayoutRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NgbAccordionModule,
    FontAwesomeModule
  ],
  exports: []
})
export class DefaultLayoutModule { }
