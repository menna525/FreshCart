import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {
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
  }
}
