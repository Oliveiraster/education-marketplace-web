import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { registerForm } from './register.form';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import type { RegisterDto } from '../../dto/register.dto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  form = registerForm(this.fb);

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

    const data: RegisterDto = this.form.getRawValue();

    this.authService.register(data).subscribe({
      next: () => {
        this.loading.set(false);
        console.log('Usuário criado');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error.message);
      },
    });
  }
}
