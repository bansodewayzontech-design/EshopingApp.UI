import { Routes } from '@angular/router';

export const viralSareesRoutes: Routes = [
	{
		path: '',
		title: 'Viral Sarees | EshopingApp',
		loadComponent: () =>
			import('./pages/viral-sarees-page.component').then((module) => module.ViralSareesPageComponent)
	}
];
