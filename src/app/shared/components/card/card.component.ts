import { Component, inject, Input } from '@angular/core';
import { product } from '../../../core/models/products/product.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SplitPipe } from '../../pipes/split-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { WishlistComponent } from '../../../features/wishlist/wishlist/wishlist.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ CommonModule , RouterLink, CurrencyPipe , SplitPipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  @Input() cardProduct: product = {} as product;


  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
   private readonly wishlistService = inject(WishlistService);



  addProductItemToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
      if(res.status === 'success'){
        this.toastrService.success(res.message , 'FreshCart')

        this.cartService.cartCount.set(res.numOfCartItems)
      }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


isFavorite: boolean = false;
toggleFavorite(event: Event) {
  event.stopPropagation();
  this.isFavorite = !this.isFavorite;

  if (this.isFavorite) {
    this.wishlistService.addToWishlist(this.cardProduct._id).subscribe({
      next: res => console.log('Added to wishlist', res),
      error: err => console.log(err)
    });
  } else {
    this.wishlistService.removeFromWishlist(this.cardProduct._id).subscribe({
      next: res => console.log('Removed from wishlist', res),
      error: err => console.log(err)
    });
  }
}
}
