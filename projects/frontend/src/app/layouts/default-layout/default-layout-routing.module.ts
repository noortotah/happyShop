import { CheckoutSuccessComponent } from './../../defaults/checkout-success/checkout-success.component';
import { ShopComponent } from './../../defaults/shop/shop.component';
import { WishlistComponent } from '../../defaults/wishlist/wishlist.component';
import { ShopCategoryComponent } from '../../defaults/shop-category/shop-category.component';
import { ExpandedShoppingCartComponent } from '../../defaults/expanded-shopping-cart/expanded-shopping-cart.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from '../../theme-components/components/components.component';
import { NucleoiconsComponent } from '../../theme-components/components/nucleoicons/nucleoicons.component';
// import { LandingComponent } from '../../theme-components/examples/landing/landing.component';
import { ProfileComponent } from '../../auth/profile/profile.component';
import { SignupComponent } from '../../auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    // { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    // { path: 'signup',           component: SignupComponent },
    // { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'shop',             component: ShopComponent },
    { path: 'shopping-cart',             component: ExpandedShoppingCartComponent },
    { path: 'checkout-success',             component: CheckoutSuccessComponent },
    { path: 'shop-category',             component: ShopCategoryComponent },
    { path: 'wishlist',             component: WishlistComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultLayoutRoutingModule { }
