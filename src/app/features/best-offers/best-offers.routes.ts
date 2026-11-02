import { Routes } from '@angular/router';

export const bestOffersRoutes: Routes = [
  {
    path: '',
    title: 'Best Offers | EshopingApp',
    loadComponent: () =>
      import('./pages/best-offers-page.component').then((module) => module.BestOffersPageComponent)
  }
];
