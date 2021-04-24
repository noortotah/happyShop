// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/landing/shop', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'landing', loadChildren: () => import('./layouts/default-layout/default-layout.module').then(m => m.DefaultLayoutModule) },
  { path: 'admin' , loadChildren: () => import('./admin/admin-layout.module').then(m => m.AdminLayoutModule) },

  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  // { path: '**', redirectTo: '/not-found'},
  { path: '**', redirectTo: '/landing/shop'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
