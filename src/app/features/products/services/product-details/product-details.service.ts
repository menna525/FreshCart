import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ProductDelailsResponse } from '../../models/product-details/product-delails.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);
  getSpecificProduct(id: string | null): Observable<ProductDelailsResponse> {
    return this.httpClient.get<ProductDelailsResponse>(environment.baseUrl + `products/${id}`);
  }
}
