import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then((module) => module.authRoutes)
	},
	{
		path: 'profile',
		loadChildren: () => import('./features/profile/profile.routes').then((module) => module.profileRoutes)
	},
	{
		path: 'orders',
		loadChildren: () => import('./features/orders/orders.routes').then((module) => module.ordersRoutes)
	},
	{
		path: 'cart',
		loadChildren: () =>
			import('./features/cart/cart.routes').then((module) => module.cartRoutes)
	},
	{
		path: 'wishlist',
		loadChildren: () =>
			import('./features/wishlist/wishlist.routes').then((module) => module.wishlistRoutes)
	},
	{
		path: 'checkout',
		loadChildren: () =>
			import('./features/checkout/checkout.routes').then((module) => module.checkoutRoutes)
	},
	{
		path: 'best-offers',
		title: 'Best Offers | EshopingApp',
		loadChildren: () =>
			import('./features/best-offers/best-offers.routes').then((module) => module.bestOffersRoutes)
	},
	{
		path: 'categories/:slug',
		title: 'Saree collection | EshopingApp',
		loadComponent: () =>
			import('./features/catalog/pages/product-list-page.component').then((module) => module.ProductListPageComponent)
	},
	{
		path: 'products',
		loadChildren: () =>
			import('./features/catalog/catalog.routes').then((module) => module.catalogRoutes)
	},
	{
		path: 'viral-sarees',
		loadChildren: () =>
			import('./features/viral-sarees/viral-sarees.routes').then((module) => module.viralSareesRoutes)
	},
	{
		path: '',
		title: 'EshopingApp | Wear your story',
		loadComponent: () =>
			import('./features/home/pages/home-page.component').then((module) => module.HomePageComponent)
	},
	{ path: '**', redirectTo: '' }
];
