import { Component } from '@angular/core';
import { Products } from '../../../shared/interface/products.js';
import { ProductsService } from '../../../core/services/products/products.service.js';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, NgIf, Location } from '@angular/common'

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  productID: string = '';
  productDetails!: Products;
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _ProductsService: ProductsService, private _Location: Location) {
    this._ActivatedRoute.params.subscribe(res => {
      this.productID = res['productID']
    });
  }

  ngOnInit(): void {
    this.getSpecificProduct();
  }

  getSpecificProduct() {
    this._ProductsService.getSpecificProduct(this.productID).subscribe({
      next: (res => {
        if (!res)
          this._Router.navigate(['/404']);
        else
          this.productDetails = res;
      }),
      error: (err => {
        console.log(err);
        this._Router.navigate(['/404']);
      })
    });
  }

  goBack(): void {
    this._Location.back();
  }

}
