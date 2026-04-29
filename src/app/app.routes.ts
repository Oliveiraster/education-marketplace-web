import type { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    component: Login,
  },
];
