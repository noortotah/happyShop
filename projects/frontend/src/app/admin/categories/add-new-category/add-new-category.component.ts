import { Store } from '@ngrx/store';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddItemToCategories } from '../../../store/feature/actions/app.actions';
import { AppState } from '../../../store';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {
  @Output() modalDismiss = new EventEmitter<boolean>();
  AddNewCategoryForm: FormGroup;
  imagePreview: string | ArrayBuffer;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.AddNewCategoryForm = new FormGroup({
      title : new FormControl('', [Validators.required]),
      img : new FormControl(''),
      subCategories : new FormArray([])
    });


  }

  onChooseFile(event) {
    console.log('onChooseFile');
    console.log(this.AddNewCategoryForm);
    const file = (event.target as HTMLInputElement).files[0];
    this.AddNewCategoryForm.patchValue({image: file});
    this.AddNewCategoryForm.get('img').updateValueAndValidity();
    console.log('onChooseFile');
    console.log(this.AddNewCategoryForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  get subCategories(): FormArray {
    return this.AddNewCategoryForm.get('subCategories') as FormArray;
  }

  removeSubCat(index: number): void{
    this.subCategories.removeAt(index);
  }

  addSubCat(subTitle): void{
    this.subCategories.push(new FormGroup({
      title: new FormControl(subTitle, [Validators.required]),
      img: new FormControl(null)
    }));

  }

  sendForm(): void{
    console.log('sendForm');
    const category = {
      title: this.AddNewCategoryForm.value.title,
      img: this.AddNewCategoryForm.value.img,
      subCategories: this.subCategories.value
    };

    this.store.dispatch( AddItemToCategories ({ category }));
    this.modalDismiss.emit(true);
  }

}
