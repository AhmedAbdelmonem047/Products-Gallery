import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service.js';
import { Products } from '../../../shared/interface/products.js';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../../../shared/pipe/filter.pipe.js';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productList: Products[] = [];
  sortedProducts: Products[] = [];
  searchVal: string = '';
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private _ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.productList = res;
        this.sortedProducts = [...this.productList];
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        console.log(err);
      }
    })
  }
  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortedProducts = [...this.productList];

    switch (value) {
      case 'name-asc':
        this.sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        this.sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        this.sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.sortedProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  get filtered(): Products[] {
    return this.productList.filter(p => p.title.toLowerCase().includes(this.searchVal.toLowerCase()));
  }
}
