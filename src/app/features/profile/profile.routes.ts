import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'My Profile | EshopingApp',
    loadComponent: () =>
      import('./pages/profile-page.component').then((module) => module.ProfilePageComponent)
  }
];
