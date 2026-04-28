import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import type { JwtPayload } from '../../../core/interfaces/jwt-payload.interface';
import type { LoginDto } from '../../../core/interfaces/login.dto';
import type { AuthResponse } from '../../../core/interfaces/auth-response.interface';

import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userSignal = signal<JwtPayload | null>(null);
  user$ = this.userSignal.asReadonly();

  private API_URL = 'http://localhost:5000/api/auth';

  private setSession(token: string) {
    localStorage.setItem('access_token', token);
    const decoded = jwtDecode<JwtPayload>(token);
    this.userSignal.set(decoded);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUser() {
    return this.userSignal();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userSignal.set(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  }

  login(data: LoginDto) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      tap(({ access_token }) => {
        this.setSession(access_token);
      }),
    );
  }
}
