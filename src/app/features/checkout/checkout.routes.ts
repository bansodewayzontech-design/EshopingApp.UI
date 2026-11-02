import { Routes } from '@angular/router';

export const checkoutRoutes: Routes = [
  {
    path: '',
    title: 'Checkout | EshopingApp',
    loadComponent: () =>
      import('./pages/checkout-page.component').then((module) => module.CheckoutPageComponent)
  }
];
