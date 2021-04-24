import { environment } from 'projects/frontend/src/environments/environment';
import {  isAdmin } from './../../auth/feature/selectors/auth.selectors';
import { selectSelectedItemsTotalState, selectUserWishlistState } from '../../store/feature/selectors/shopping-cart.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Component, OnInit, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectSelectedItemsState } from '../../store/feature/selectors/shopping-cart.selectors';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    imagePath = environment.image_path;
    private sidebarVisible: boolean;
    isAdmin: Boolean;
    shoppingCartItems$: Observable<any[]>;
    wishlistItems$: Observable<any[]>;

    constructor(public location: Location,
                private element : ElementRef,
                @Inject(DOCUMENT) private document: Document,
                private store: Store<AppState>) {
        this.sidebarVisible = false;
    }



    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      if (window.scrollY > 20 ||
      document.documentElement.scrollTop > 20) {
        document.getElementById('navnav').classList.remove('navbar-transparent');
        document.getElementById('navnav').classList.remove('mt-sm-5');
        document.getElementById('happy-word').classList.add('text-dark');


      }else{
        document.getElementById('navnav').classList.add('navbar-transparent');
        document.getElementById('navnav').classList.add('mt-sm-5');
        document.getElementById('happy-word').classList.remove('text-dark');
      }
    }
    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.shoppingCartItems$ = this.store.select(selectSelectedItemsState);
        this.wishlistItems$ = this.store.select(selectUserWishlistState);

      this.store.select(isAdmin).subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });
    }

    getTotal() {
      return this.store.select(selectSelectedItemsTotalState);
    }



}
