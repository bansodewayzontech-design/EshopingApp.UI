import { Routes } from '@angular/router';

export const authRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{
		path: 'login',
		title: 'Sign In | EshopingApp',
		loadComponent: () => import('./pages/login-page.component').then((module) => module.LoginPageComponent)
	},
	{
		path: 'register',
		title: 'Create Account | EshopingApp',
		loadComponent: () => import('./pages/register-page.component').then((module) => module.RegisterPageComponent)
	},
	{
		path: 'forgot-password',
		title: 'Password Help | EshopingApp',
		loadComponent: () => import('./pages/forgot-password-page.component').then((module) => module.ForgotPasswordPageComponent)
	}
];
