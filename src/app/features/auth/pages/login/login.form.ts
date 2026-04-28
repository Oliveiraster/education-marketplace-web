import type { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

export function loginForm(fb: FormBuilder) {
  return fb.nonNullable.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });
}
