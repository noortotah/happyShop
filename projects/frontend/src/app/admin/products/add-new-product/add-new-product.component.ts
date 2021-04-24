import { LoadCategoriesForAdmin } from './../../../store/feature/actions/app.actions';
import { Product } from './../../../models/product';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectAdminCategoriesState } from './../../../store/feature/selectors/app.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store';
import { Category } from '../../../models/category';
import { AddItemToProducts } from '../../../store/feature/actions/app.actions';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})

export class AddNewProductComponent implements OnInit {
  imagePreview: string | ArrayBuffer;
  isInnerFormShown = false;
  categories$: Observable<Category[]>;
  addProductForm: FormGroup;
  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.store.dispatch(LoadCategoriesForAdmin());
    this.categories$ = this.store.select(selectAdminCategoriesState);
  }

  initForm() {
    this.imagePreview = 'assets/img/no-product.png';
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      sku: [''],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      pricing: this.formBuilder.group({
        price: [0, Validators.required],
        oldPrice: [0]
      }),
      shipping_details: this.formBuilder.group({
        width: [0],
        height: [0],
        depth: [0],
        weight: [0],
      }),
      manufacture_details: this.formBuilder.group({
        model_number: [''],
        release_date: [new Date()],
      }),
      images : [null, Validators.required ],
      // images: this.formBuilder.group({
      //   main: [''],
      //   catalog: this.formBuilder.array([])
      // }),
      variations: this.formBuilder.array([]),
      variation_quantity: this.formBuilder.array([]),
      categories: this.formBuilder.array([

      ])

    });
  }
  get variations(): FormArray {
    return this.addProductForm.get('variations') as FormArray;
  }

  get categories(): FormArray {
    return this.addProductForm.get('categories') as FormArray;
  }

  addVariationsToForm(type: string, name: string, values: string): void{
    const control = this.formBuilder.group({
      type: [type, [Validators.required]],
      name: [name, [Validators.required]],
      values: [values, [Validators.required]],
    });
    this.variations.push(control);
  }

  removeVariationsFromForm(index: number){
    this.variations.removeAt(index);
  }

  addCategoryToForm(event, _id: string): void{
    if(event.target.checked){
      this.categories.push(this.formBuilder.control(_id));
    }else{
      //remove from array
      this.categories.removeAt(  this.categories.controls.indexOf(this.formBuilder.control(_id)) );
    }
  }

  toggleInnerForm(): void{
    console.log(this.isInnerFormShown);
    this.isInnerFormShown = !this.isInnerFormShown;
  }

  submitForm(): void{
    const product: Product = {
      title: this.addProductForm.value.title,
      sku: this.addProductForm.value.sku,
      quantity: this.addProductForm.value.quantity,
      description: this.addProductForm.value.description,
      pricing: {
        price: this.addProductForm.value.pricing.price,
        oldPrice: this.addProductForm.value.pricing.oldPrice
      },
      shipping_details:{
        width: this.addProductForm.value.shipping_details.width,
        height: this.addProductForm.value.shipping_details.height,
        depth: this.addProductForm.value.shipping_details.depth,
        weight: this.addProductForm.value.shipping_details.weight,
      },
      manufacture_details: {
        model_number: this.addProductForm.value.manufacture_details.model_number,
        release_date: this.addProductForm.value.manufacture_details.release_date,
      },
      images: this.addProductForm.value.images,
      variations: this.variations.controls.map( variation => {
        return {
          type: variation.value.type,
          name: variation.value.name,
          values: variation.value.values.split(','),
        };
      })
      ,
      variation_quantity: [],
      categories: this.categories.value,
      outofStock: !this.addProductForm.value.quantity

    };

    this.store.dispatch( AddItemToProducts({ product } ));

  }

  onChoosefile(event: Event): void {
    console.log('onChooseFile');
    // console.log(this.addProductForm);
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);

    this.addProductForm.patchValue({images: file});
   console.log(this.addProductForm.value.images)
    // console.log(this.addProductForm.get('images')['controls'].get('main'));
     this.addProductForm.get('images').updateValueAndValidity();
    // console.log('onChooseFile');
    // console.l /og(this.addProductForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

