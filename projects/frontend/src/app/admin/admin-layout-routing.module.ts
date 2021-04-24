import { IsAdminGuard } from './../guards/isadmin.guard';
import { OrdersComponent } from './orders/orders.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { TypographyComponent } from '../theme-components/components/typography/typography.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { IconsComponent } from '../theme-components/pages/icons/icons.component';
// import { MapsComponent } from '../theme-components/pages/maps/maps.component';
// import { NotificationsComponent } from '../theme-components/pages/notifications/notifications.component';
import { TableComponent } from '../theme-components/pages/table/table.component';
// import { UpgradeComponent } from '../theme-components/pages/upgrade/upgrade.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserComponent } from '../theme-components/pages/user/user.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivate: [AuthGuard, IsAdminGuard], children: [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'categories',           component: CategoriesComponent },
    { path: 'products',  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)  },
    { path: 'orders',  component: OrdersComponent},
    { path: 'table',          component: TableComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
