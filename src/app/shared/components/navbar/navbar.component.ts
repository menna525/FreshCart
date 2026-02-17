import { Component, Input, AfterViewInit, inject, PLATFORM_ID, Signal, computed, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/authentication/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
/**
 * Interface for Language Object
 * This defines the structure of each language option
 */
interface Language {
  code: string;    // Language code (e.g., 'EN', 'AR', 'FR')
  name: string;    // Full language name (e.g., 'English', 'Arabic')

}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit , OnInit {

  @Input({ required: true }) isLogin!: boolean;

  private platformId = inject(PLATFORM_ID);
  private  authService = inject(AuthService);
  private  cartService = inject(CartService);
  private  plat_id = inject(PLATFORM_ID);

  count : Signal<number> = computed(()=>this.cartService.cartCount())

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();

    }
  }


ngOnInit(): void {
  if(isPlatformBrowser(this.plat_id)){
    const token = localStorage.getItem(STORED_KEYS.userToken);
    if (token) {
      this.getAllCartData();
    }
  }
}
getAllCartData() : void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartService.cartCount.set(res.numOfCartItems);
    }
  })
}


  signOut():void{
    this.authService.userLogOut();
  }

  // Controls whether the dropdown is open or closed

  private readonly translateService = inject(TranslateService);
  private readonly renderer2 = inject(Renderer2);



  isDropdownOpen: boolean = false;

  // Currently selected language
  selectedLanguage: Language = {
    code: this.translateService.getCurrentLang(),
    name: 'English',
  };

  // Available languages
  // You can add more languages here
  languages: Language[] = [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'ar',
      name: 'Arabic'
    },
    {
      code: 'de',
      name: 'Deutsch'
    }
  ];

  /**
   * Toggle the dropdown open/closed
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Close the dropdown
   */
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  /**
   * Select a language and close the dropdown
   * @param language - The language object to select
   */
  selectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.closeDropdown();

    this.translateService.use(language.code);
    this.renderer2.setAttribute(document.documentElement, 'lang' , language.code);
    this.renderer2.setAttribute(
      document.documentElement,
      'lang',
      language.code === 'en' || language.code === 'de' ? 'ltr' : 'rtl' ,
    );

    // Here you can add your language change logic
    // For example: this.translateService.use(language.code);
    console.log('Language changed to:', language.code);
  }
}
