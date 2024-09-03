import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(
    private productsService: ProductsService
  ){}

  products: Product[] = [];

  onProductOutPut(product: Product){
    console.log(product, 'Output');
  }

  ngOnInit() {
    this.productsService
    .getProducts('https://localhost:7292/api/Products', {page: '', perPage: ''})
    .subscribe((products: Products) => {
      this.products = products.items;
    })
  }
}
