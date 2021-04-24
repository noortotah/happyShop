
import { tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { selectAdminProductdyIDState } from './../../../store/feature/selectors/app.selectors';
import { Product } from './../../../models/product';
import { EditItemInProducts, LoadCategoriesForAdmin } from './../../../store/feature/actions/app.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../store/index';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from './../../../models/category';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { selectAdminCategoriesState } from '../../../store/feature/selectors/app.selectors';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  imagePath = environment.image_path;
  product: Product;
  imagePreview: string | ArrayBuffer;
  isInnerFormShown = false;
  categories$: Observable<Category[]>;
  editProductForm: FormGroup;
  constructor(private store: Store<AppState>,
              private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.store.dispatch(LoadCategoriesForAdmin());
    this.categories$ = this.store.select(selectAdminCategoriesState);
    const productId =  this.activatedRoute.snapshot.params.id;
    this.httpClient.get(environment.backend_url + 'admin/products/'+ productId)
                    .subscribe((response: { product: Product, success: boolean}) => {
                      this.product = response.product;
                      this.updateForm();
                    })
  }
  updateForm(){
    console.log('_id', this.product._id);

    this.editProductForm.setValue({
      title: this.product.title,
      sku: this.product.sku,
      quantity: this.product.quantity,
      description: this.product.description,
      pricing: {
        price: this.product.pricing.price,
        oldPrice: this.product.pricing.oldPrice? this.product.pricing.oldPrice : 0
      },
      shipping_details: {
        width: this.product.shipping_details.width,
        height: this.product.shipping_details.height,
        depth: this.product.shipping_details.depth,
        weight: this.product.shipping_details.weight,
      },
      manufacture_details: {
        model_number: this.product.manufacture_details.model_number,
        release_date: this.product.manufacture_details.release_date,
      },
      images : this.product.images.main ? this.product.images.main : null,
      variations: [],
      variation_quantity: [],
      categories: []

    });

    this.imagePreview = this.product.images.main;
    console.log('updateForm', this.imagePreview)
    //Add Product Categories to FormArray
    if(this.product.categories?.length){
      console.log(this.product.categories)
      this.product.categories.forEach((element,index) => {
        console.log(index, element)
        this.categories.push(this.formBuilder.control(element));
      })
    }

    if(this.product.variations?.length){
      this.product.variations.forEach((element,index) => {
        console.log(element)
        this.addVariationsToForm(element.type, element.name, element.values.join(','))
      })
    }
  }
  initForm() {
    this.imagePreview = 'assets/img/no-product.png';
    this.editProductForm = this.formBuilder.group({
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
      variations: this.formBuilder.array([]),
      variation_quantity: this.formBuilder.array([]),
      categories: this.formBuilder.array([])

    });
  }
  get variations(): FormArray {
    return this.editProductForm.get('variations') as FormArray;
  }

  get categories(): FormArray {
    return this.editProductForm.get('categories') as FormArray;
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
      _id: this.product._id,
      title: this.editProductForm.value.title,
      sku: this.editProductForm.value.sku,
      quantity: this.editProductForm.value.quantity,
      description: this.editProductForm.value.description,
      pricing: {
        price: this.editProductForm.value.pricing.price,
        oldPrice: this.editProductForm.value.pricing.oldPrice
      },
      shipping_details:{
        width: this.editProductForm.value.shipping_details.width,
        height: this.editProductForm.value.shipping_details.height,
        depth: this.editProductForm.value.shipping_details.depth,
        weight: this.editProductForm.value.shipping_details.weight,
      },
      manufacture_details: {
        model_number: this.editProductForm.value.manufacture_details.model_number,
        release_date: this.editProductForm.value.manufacture_details.release_date,
      },
      images: this.editProductForm.value.images,
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
      outofStock: !this.editProductForm.value.quantity

    };

    this.store.dispatch( EditItemInProducts({ product } ));

  }

  onChoosefile(event: Event): void {
    console.log('onChooseFile');
    // console.log(this.addProductForm);
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);

    this.editProductForm.patchValue({images: file});
   console.log(this.editProductForm.value.images)
    // console.log(this.addProductForm.get('images')['controls'].get('main'));
     this.editProductForm.get('images').updateValueAndValidity();
    // console.log('onChooseFile');
    // console.l /og(this.addProductForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

