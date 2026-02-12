import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductDetailsService } from '../products/services/product-details/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDelails } from '../products/models/product-details/product-delails.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly productDetailsService= inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  productId: string | null = null;
productDetailsData:WritableSignal<ProductDelails>=signal<ProductDelails>({} as ProductDelails);
  ngOnInit(): void {
    this.getProductId();
  }

 getProductId(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (urlparams) => {
      this.productId = urlparams.get('id');

      if (this.productId) {
        this.getSpecificProductData();
      }
    },
  });
}

  getSpecificProductData(): void {
    this.productDetailsService.getSpecificProduct(this.productId).subscribe({
        next:(res) => {
          this.productDetailsData.set(res.data);
        },
        error:(err) => {
          console.log(err);
        }

    })
  }
}
