import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ FooterComponent ],
    exports: [ FooterComponent ]
})

export class FooterModule {}
