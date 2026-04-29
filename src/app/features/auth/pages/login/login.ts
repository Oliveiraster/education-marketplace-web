import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { loginForm } from './login.form';
import type { LoginDto } from '../../dto/login.dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form = loginForm(this.fb);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    const data: LoginDto = this.form.getRawValue();

    this.authService.login(data).subscribe({
      next: () => {
        this.loading.set(false);
        console.log('Loginsucesso');
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('Error not await. try see you later.');
        }
      },
    });
  }
}
