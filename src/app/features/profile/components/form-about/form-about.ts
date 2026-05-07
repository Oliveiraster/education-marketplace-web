import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './form-about.html',
  styleUrl: './form-about.scss',
})
export class FormAbout {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    role: ['', Validators.required],
    objective: [''],
    skills: [''],
    bio: ['', [Validators.required, Validators.minLength(10)]],
  });

  get role() {
    return this.form.get('role');
  }

  get bio() {
    return this.form.get('bio');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const payload = {
      ...value,
      skills: value.skills ? value.skills.split(',').map((s: string) => s.trim()) : [],
    };

    console.log(payload);
  }
}
