import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnInit {
  private readonly translateService = inject(TranslateService);

ngOnInit(): void {
this.onLangChange();
}

onLangChange():void{
  this.translateService.onLangChange.subscribe({
    next:(data)=>{
      this.mainSliderCustomOptions={
        ...this.mainSliderCustomOptions,
        rtl:data.lang === 'ar' ? true : false,
      }
    }
  })
}

mainSliderCustomOptions: OwlOptions = {
    loop: true,
    items: 1,
    touchDrag: true,
    mouseDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    navText: ['', ''],
    nav: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    rtl:this.translateService.getCurrentLang() ==='ar' ? true : false ,
  }
}
