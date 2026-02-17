import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CartDataResponse } from '../models/cart-data.interface';
import { CartDetailsResponse } from '../models/cart-details.interface';
import { PaymentDetailsResponse } from '../models/payment-details.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  cartCount: WritableSignal<number> = signal<number>(0);

  addProductToCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(
      `${environment.baseUrl}cart`,
      { productId: id }
    );
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(`${environment.baseUrl}cart`);
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(`${environment.baseUrl}cart/${id}`);
  }

  updateCartProductQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(
      `${environment.baseUrl}cart/${id}`,
      { count }
    );
  }

  checkoutSession(cartId: string | null, checkoutData: object): Observable<PaymentDetailsResponse> {
    const returnUrl = window.location.origin; // URL ديناميكي بدل localhost
    return this.httpClient.post<PaymentDetailsResponse>(
      `${environment.baseUrl}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      checkoutData
    );
  }
}
