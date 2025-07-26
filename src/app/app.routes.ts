import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component.js';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/pages/home/home.component.js').then((c) => c.HomeComponent), title: 'Home' },
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component.js').then((c) => c.ProductsComponent), title: 'Products' },
            { path: 'products/:productID', loadComponent: () => import('./features/pages/product-details/product-details.component.js').then((c) => c.ProductDetailsComponent), title: 'Product Details' },
        ]
    },
    { path: '**', loadComponent: () => import('./features/pages/not-found/not-found.component.js').then((c) => c.NotFoundComponent), title: '404' },
];
