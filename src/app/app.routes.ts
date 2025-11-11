import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: async () => (await import('./pages/dashboard/dashboard')).Dashboard,
    },
];
