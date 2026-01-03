import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    {
        path: 'courses',
        loadComponent: () => import('./pages/course-management/course-management')
    },
    {
        path: 'course-enrollments',
        loadComponent: () => import('./pages/course-enrollments/course-enrollments')
    }
];