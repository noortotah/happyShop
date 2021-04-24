import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersComponent } from './orders/orders.component';
import { AppEffects } from './../store/feature/effects/app.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { AddNewCategoryComponent } from './categories/add-new-category/add-new-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
// import { ToastrModule } from 'ngx-toastr';
// import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddNewCategoryComponent,
    EditCategoryComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    // ChartsModule,
    AdminLayoutRoutingModule,
    EffectsModule.forFeature([AppEffects]),
    // ToastrModule,
    // StoreModule.forFeature('admin', fromAuthStore.reducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  bootstrap: []
})
export class AdminLayoutModule { }
