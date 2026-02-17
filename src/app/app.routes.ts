import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Layout للـ Guests (Login/Register)
  {
    path: '',
    loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component')
      .then(m => m.AuthLayoutComponent),
    canActivate: [guestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./core/auth/register/register.component').then(m => m.RegisterComponent), title: 'Register' }
    ]
  },
  // Layout للـ Authenticated Users
  {
    path: '',
    loadComponent: () => import('./core/layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'products', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
      { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
      { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
      { path:'details/:id', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'Checkout' },
      { path: 'allorders', loadComponent: () => import('./features/allorders/allorders.component').then(m => m.AllordersComponent), title: 'Orders' },
      { path: '**', loadComponent: () => import('./features/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' }
    ]
  }
];
