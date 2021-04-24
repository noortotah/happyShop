// import { EditItemInCategories } from './../../../store/feature/actions/app.actions';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category';
import { AppState } from '../../../store';
import { EditItemInCategories } from '../../../store/feature/actions/app.actions';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() category: Category;
 @Output() modalDismiss = new EventEmitter<boolean>();
  editCategoryForm: FormGroup;
  imagePreview: string | ArrayBuffer;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.editCategoryForm = new FormGroup({
      title : new FormControl(this.category.title, [Validators.required]),
      img : new FormControl(this.category.img),
      subCategories : new FormArray([])
    });

    this.category.subCategories.forEach( (element, index) => {
      this.subCategories.push(new FormGroup({
        _id: new FormControl(element._id, [Validators.required]),
        title: new FormControl(element.title, [Validators.required]),
        img: new FormControl(element.img)
      }));
    });

  }

  get subCategories(): FormArray {
    return this.editCategoryForm.get('subCategories') as FormArray;
  }

  removeSubCat(index: number): void{
    this.subCategories.removeAt(index);
  }

  addSubCat(subTitle): void{
    this.subCategories.push(new FormGroup({
      title: new FormControl(subTitle, [Validators.required]),
      img: new FormControl(null)
    }));

    console.log(this.subCategories.value);

  }

  onChooseFile(event) {
    console.log('onChooseFile');
    console.log(this.editCategoryForm);
    const file = (event.target as HTMLInputElement).files[0];
    this.editCategoryForm.patchValue({image: file});
    this.editCategoryForm.get('img').updateValueAndValidity();
    console.log('onChooseFile');
    console.log(this.editCategoryForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  sendForm(): void{
    console.log('sendForm', this.editCategoryForm.value);
    const category = {
      _id: this.category._id,
      title: this.editCategoryForm.value.title,
      img: this.editCategoryForm.value.img,
      subCategories: this.subCategories.value
    };

    this.store.dispatch( EditItemInCategories( { category }));
    this.modalDismiss.emit(true);
  }


}
