import type { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

export function registerForm(fb: FormBuilder) {
  return fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });
}
