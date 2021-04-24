import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectProductsState, selectHoodiesState } from '../../store/feature/selectors/app.selectors';
import { Product } from '../../models/product';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  @ViewChild('carousel1') carousel1: NgbCarousel;
  @ViewChild('carousel2') carousel2: NgbCarousel;
  @ViewChild('carousel3') carousel3: NgbCarousel;
  @ViewChild('carousel4') carousel4: NgbCarousel;



  // productsJson = productsJosn;
  products$: Observable<Product[]>;
  hoodies$: Observable<Product[]>;
  intervalCount: NodeJS.Timeout;


  constructor(private store: Store<AppState>) {

  }
  ngOnDestroy(): void {
    clearInterval(this.intervalCount);
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsState);

    this.hoodies$ = this.store.select(selectHoodiesState);
    let productsLength = 0;
    // this.products$.pipe(take(1)).subscribe( products => productsLength = products.length );

    if (productsLength) {
      this.intervalCount = setInterval( () => {
        this.carousel1.next();
        this.carousel2.next();
        this.carousel3.next();
        this.carousel4.next();
      }, 2500);
    }

  }




}
