import { LoadCategoriesForAdmin } from './../../store/feature/actions/app.actions';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { selectAdminCategoriesState } from './../../store/feature/selectors/app.selectors';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Category } from '../../models/category';
import { RemoveItemFromCategories } from '../../store/feature/actions/app.actions';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  faSadTear = faSadTear;
  categories$: Observable<Category[]>;
  constructor(private modalService: NgbModal, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(LoadCategoriesForAdmin());
    this.categories$ = this.store.select(selectAdminCategoriesState);
  }


  openAddCategory(): void {
    const modal = this.modalService.open(
        AddNewCategoryComponent,
        {
          size: 'lg',
        }
      );

    // modal.componentInstance.product = this.product;
    modal.componentInstance.modalDismiss.subscribe($e => {
        modal.close();
      });


  }


  openEditCategory(category: Category): void {
    const modal = this.modalService.open(
        EditCategoryComponent,
        {
          size: 'lg',
        }
      );

    modal.componentInstance.category = category;
    modal.componentInstance.modalDismiss.subscribe($e => {
      console.log($e);
      modal.close();
    });


  }


  deleteCategory(categoryId: string): void{
    if (confirm('Are You Sure You want to delete ?')) {
      this.store.dispatch(RemoveItemFromCategories({categoryId}));
    }
  }
}
