import { Routes } from '@angular/router';

export const wishlistRoutes: Routes = [
  {
    path: '',
    title: 'Wishlist | EshopingApp',
    loadComponent: () =>
      import('./pages/wishlist-page.component').then((module) => module.WishlistPageComponent)
  }
];
