import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../orders/services/orders.service';
import { Orders } from '../../core/models/orders/orders.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);

  ordersData: WritableSignal<Orders[]> = signal<Orders[]>([]);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        if (res) {
          this.ordersData.set(res.data);
          console.log(res)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
