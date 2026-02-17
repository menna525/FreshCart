import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { product } from '../../core/models/products/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import {NgxPaginationModule, PaginationInstance} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit{
  private readonly ProductsServices: ProductsService = inject(ProductsService);

  productList:WritableSignal<product[]> = signal([]);

pagination:PaginationInstance = { id: 'products',
                                                      itemsPerPage: 40,
                                                      currentPage: 1,
                                                      totalItems: 0 }

  ngOnInit(): void {
    this.getAllProductsData();
  }

getAllProductsData(): void {
      this.ProductsServices.getAllProducts(this.pagination.currentPage , this.pagination.itemsPerPage).subscribe({
        next: (res) => {
          this.productList.set(res.data);
          this.pagination.totalItems=res.results;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
text:string='';

pageChanged(page:number):void{
this.pagination.currentPage=page;
this.getAllProductsData();
}
}

