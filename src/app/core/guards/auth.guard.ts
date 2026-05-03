import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  if (!token || isTokenValid(token)) {
    localStorage.removeItem('access_token');
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};
