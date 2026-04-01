import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { STATUS_CODES } from 'http';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { WishlistResponse } from '../../../core/models/Wishlist/wishlist.interface';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpclient = inject(HttpClient);

getHeaders() {
  return {
    headers: {
      token: localStorage.getItem(STORED_KEYS.userToken)!
    }
  };
}

getWishlistData(): Observable<WishlistResponse> {
  return this.httpclient.get<WishlistResponse>(
    environment.baseUrl + 'wishlist',
    this.getHeaders()
  );
}
addToWishlist(productId: string) {
  return this.httpclient.post(environment.baseUrl + 'wishlist', { productId }, this.getHeaders());
}

removeFromWishlist(productId: string) {
  return this.httpclient.delete(environment.baseUrl + 'wishlist/' + productId, this.getHeaders());
}
}
