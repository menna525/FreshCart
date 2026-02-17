import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { BrandsService } from './services/brands.service';
import { Brands } from './models/brands.interface';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);

  brandsList: WritableSignal<Brands[]> = signal([]);
  isLoading = signal(true);
  isError = signal(false);

  ngOnInit(): void {
    this.getBrands();
  }

  private getBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
        this.isLoading.set(false);
        console.log(res)
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.isError.set(true);
        console.log(err);
      }
    });
  }
}
