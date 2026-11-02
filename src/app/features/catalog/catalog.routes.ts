import { Routes } from '@angular/router';

export const catalogRoutes: Routes = [
  {
    path: '',
    title: 'Sarees | EshopingApp',
    loadComponent: () =>
      import('./pages/product-list-page.component').then((module) => module.ProductListPageComponent)
  },
  {
    path: ':id',
    title: 'Saree details | EshopingApp',
    loadComponent: () =>
      import('./pages/product-detail-page.component').then((module) => module.ProductDetailPageComponent)
  }
];
