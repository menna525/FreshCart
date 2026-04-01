import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { WishlistResponse } from '../../../core/models/Wishlist/wishlist.interface';
import { Router } from '@angular/router';
import { SplitPipe } from '../../../shared/pipes/split-pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, SplitPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishListDetailsData: WritableSignal<WishlistResponse> = signal({} as WishlistResponse);
  private readonly wishlistService = inject(WishlistService)
  private readonly router = inject(Router);
  ngOnInit(): void {
this.wishlistData();
  }
wishlistData(): void {
      this.wishlistService.getWishlistData().subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.wishListDetailsData.set(res)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  openProduct(product: any): void {
  // مثال للتوجيه لصفحة تفاصيل المنتج
  this.router.navigate(['/details', product.slug, product.id]);
}
}
