import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'courses',
        loadComponent: () => import('./pages/courses/courses')
    },
    {
        path: 'my-enrollments',
        loadComponent: () => import('./pages/my-enrollments/my-enrollments')
    },
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    }
];