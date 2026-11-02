import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: '',
    title: 'My Orders | EshopingApp',
    loadComponent: () =>
      import('./pages/orders-page.component').then((module) => module.OrdersPageComponent)
  }
];
