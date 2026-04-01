import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { OrdersService } from '../orders/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);

  private readonly ordersService = inject(OrdersService)
private readonly toastr = inject(ToastrService)

  cartId: string | null = null;
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.checkoutFormInitialization();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      },
    });
  }

  checkoutFormInitialization(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]],
      }),
    });
  }

  onSubmitCheckoutForm(): void {
    if (this.checkoutForm.valid) {
      this.cartService.checkoutSession(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url, '_self'); // هيفتح صفحة الدفع في نفس التبويب
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
 cashPayment(): void {

  if (!this.cartId) {
    console.log('cartId is null ❌')
    return;
  }

  this.ordersService.cashOrder(this.cartId, this.checkoutForm.value).subscribe({

    next: (res) => {
      console.log(res)
      this.toastr.success('Order placed successfully 💙')
    },

    error: (err) => {
      console.log(err)
    }

  })
}
}
