import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories/categories.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);

  categoriesList: WritableSignal<Categories[]> = signal([]);
  isLoading = signal(true);
  isError = signal(false);

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.isError.set(true);
        console.log(err);
      }
    });
  }
}
