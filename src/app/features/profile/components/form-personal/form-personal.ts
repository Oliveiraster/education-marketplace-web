import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './form-personal.html',
  styleUrl: './form-personal.scss',
})
export class FormPersonal implements OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', Validators.required],
    phone: [''],
    birthDate: [''],
  });

  ngOnInit() {
    this.loadUser();
  }

  get name() {
    return this.form.get('name');
  }

  loadUser() {
    const user = {
      name: 'Raphael Oliveira',
      phone: '83999999999',
      birthDate: '2000-01-01',
    };

    this.form.patchValue(user);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    console.log('Atualizar usuário:', payload);
  }
}
