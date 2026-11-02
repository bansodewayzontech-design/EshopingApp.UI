import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    title: 'Shopping Bag | EshopingApp',
    loadComponent: () =>
      import('./pages/cart-page.component').then((module) => module.CartPageComponent)
  }
];
