import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product'
import { UtilitiesService } from '../../services/utilities/utilities.service'
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  submitted = false;
  public myForm: FormGroup;
  public product: Product;
  public toggleCheck: boolean = true;
  public buttonStatus: boolean = false;
  ingredients: string[] = new Array();
  constructor(private utils: UtilitiesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.validations();
  }
  initForm() {
    this.myForm = this.fb.group({
      name: [''],
      price: [''],
      ingredients: ['']
    });
  }
  validations() {
    this.myForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(1),
        Validators.maxLength(10)
      ])],
      ingredients: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(150),
      ])]
    })
  }
  getStatus() {
    this.toggleCheck = !this.toggleCheck;
    if (this.toggleCheck === true) {
      this.myForm.get('ingredients').disable();
      this.buttonStatus = true;
    }
    if (this.toggleCheck === false) {
      this.myForm.get('ingredients').enable()
      this.buttonStatus = false;
    }
  }
  addInterest() {
    this.ingredients.push(this.myForm.get('ingredients').value);
    this.utils.createToast('Ingrediente añadido');
    this.myForm.get('ingredients').reset();
  }
  deleteIngredient() {
    this.ingredients.pop();
  }

  addProduct() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.utils.createProduct({
        name: this.myForm.get('name').value,
        price: this.myForm.get('price').value,
        ingredients: this.ingredients,
      });
      this.myForm.reset();
      this.toggleCheck=true;
      this.buttonStatus = true;
      this.initForm();
      this.ingredients.length = 0;
      this.utils.LoadPag();
      this.utils.createToast('Producto añadido');
    }
  }
}
