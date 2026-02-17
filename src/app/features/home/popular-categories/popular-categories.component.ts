import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from '../../../core/models/categories/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly translateService = inject(TranslateService);

private readonly categoriesService = inject(CategoriesService);
  categoriesList:WritableSignal<Categories[]> = signal<Categories[]>([]);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList.set(res.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.onLangChange();
  }

onLangChange():void{
  this.translateService.onLangChange.subscribe({
    next:(data)=>{
      this.categoriesCustomoption={
        ...this.categoriesCustomoption,
        rtl:data.lang === 'ar' ? true : false,
      }
    }
  })
}

  categoriesCustomoption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
    rtl:this.translateService.getCurrentLang() ==='ar' ? true : false ,

  }
}
