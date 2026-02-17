import { Component, inject, Input } from '@angular/core';
import { product } from '../../../core/models/products/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SplitPipe } from '../../pipes/split-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe , SplitPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardProduct: product = {} as product;


  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)


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
}
