import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedPluginModule } from './fixedplugin/fixedplugin.module';
import { LandingNavbarModule } from './landing-navbar/navbar.module';
import { LandingFooterModule } from './landing-footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';

import { SidebarModule } from './sidebar/sidebar.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FooterModule,
    NavbarModule,
    LandingFooterModule,
    LandingNavbarModule,
    SidebarModule,
    FixedPluginModule
  ],
  exports: [
    FooterModule,
    NavbarModule,
    LandingFooterModule,
    LandingNavbarModule,

    SidebarModule,
    FixedPluginModule
  ]
})
export class SharedModule { }
