import { map, take } from 'rxjs/operators';
import { isLoggedIn } from './../../auth/feature/selectors/auth.selectors';
import { LoadShoppingCarts, LoadWishList } from './../../store/feature/actions/shopping-cart.actions';
import { LoadShopProducts, LoadShopCategories } from './../../store/feature/actions/app.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AppState } from '../../store';
// import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private plateformId
  ) {}

  ngOnInit(): void {

    this.store.select(isLoggedIn).subscribe(
      isLoggedIn => {
        if(isLoggedIn){

          this.store.dispatch(LoadShoppingCarts());
          this.store.dispatch(LoadWishList());
        }
      }
    );

    this.store.dispatch(LoadShopProducts());
    this.store.dispatch(LoadShopCategories());


    // console.log('in ini');
    // if (isPlatformBrowser(this.plateformId)) {
    //   console.log('heeeereee');

    //   this.store.dispatch(autoAuth());
    // }
  }
}
