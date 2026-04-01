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
  currentIndex: number = 0;
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
          this.currentIndex = 0;
        },
        error:(err) => {
          console.log(err);
        }

    })
  }

nextImage() {
  const images = this.productDetailsData().images;
  if (!images?.length) return;

  if (this.currentIndex < images.length - 1) {
    this.currentIndex++;
  } else {
    this.currentIndex = 0;
  }
}

prevImage() {
  const images = this.productDetailsData().images;
  if (!images?.length) return;

  if (this.currentIndex > 0) {
    this.currentIndex--;
  } else {
    this.currentIndex = images.length - 1;
  }
}
}
