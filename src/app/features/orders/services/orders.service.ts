import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { OrdersResponse } from '../../../core/models/orders/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);

  getAllOrders(): Observable<OrdersResponse> {
    return this.httpClient.get<OrdersResponse>(environment.baseUrl + 'orders');
  }
  cashOrder(cartId: string, shippingData: any): Observable<any> {
  return this.httpClient.post(
    environment.baseUrl + `orders/${cartId}`,
    {
      shippingAddress: shippingData
    }
  );
}
}
