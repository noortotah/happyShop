import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule as NgSidebarModule } from 'ng-sidebar';


@NgModule({
    imports: [ RouterModule, CommonModule, NgSidebarModule.forRoot(), ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
