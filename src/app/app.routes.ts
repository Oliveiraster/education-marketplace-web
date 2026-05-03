import type { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { authGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },
    ],
  },
  {
    path: '**',
    component: Login,
  },
];
