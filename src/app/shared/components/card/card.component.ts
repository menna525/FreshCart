import { Component, Input } from '@angular/core';
import { product } from '../../../core/models/products/product.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
@Input() cardProduct:product={}as product;
}
