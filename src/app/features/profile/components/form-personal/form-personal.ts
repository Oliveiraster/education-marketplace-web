import { Component, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProfileStoreService } from '../../services/profile-store.service';
import type { PersonalDto } from '../../dto/personal.dto';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ProfileApiService } from '../../services/profile-api.service';

@Component({
  selector: 'app-form-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './form-personal.html',
  styleUrl: './form-personal.scss',
})
export class FormPersonal {
  private fb = inject(FormBuilder);
  private readonly profileStore = inject(ProfileStoreService);
  private readonly profileApi = inject(ProfileApiService);
  private readonly notification = inject(NotificationService);

  readonly profile$ = this.profileStore.profile;

  form = this.fb.group({
    name: ['', [Validators.required]],
    phone: [''],
    whatsapp: [''],
  });

  get name() {
    return this.form.get('name');
  }

  private readonly syncProfileEffect = effect(() => {
    const profile = this.profile$();
    if (profile) {
      this.form.patchValue({
        name: profile.name,
        phone: this.formatPhone(profile.phone || ''),
        whatsapp: this.formatPhone(profile.whatsapp || ''),
      });
    }
  });

  private formatPhone(value: string): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');
    if (numbers.length > 10) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (numbers.length > 6) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }

    if (numbers.length > 2) {
      return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    }

    return numbers;
  }

  onPhoneInput(event: Event, field: 'phone' | 'whatsapp') {
    const input = event.target as HTMLInputElement;

    let numbers = input.value.replace(/\D/g, '');

    numbers = numbers.slice(0, 11);

    let formatted = numbers;

    if (numbers.length > 6) {
      formatted = numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (numbers.length > 2) {
      formatted = numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    }

    formatted = formatted.replace(/-$/, '');

    input.value = formatted;
    this.form.get(field)?.setValue(numbers, {
      emitEvent: false,
      emitModelToViewChange: false,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: PersonalDto = {
      name: raw.name || '',
      phone: raw.phone ? `+55${raw.phone}` : undefined,
      whatsapp: raw.whatsapp ? `+55${raw.whatsapp}` : undefined,
    };

    console.log(payload);
    this.profileApi.updateMyPersonal(payload).subscribe({
      next: () => {
        this.profileStore.loadProfile();

        this.notification.success('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        this.notification.apiError(err, 'Erro ao atualizar perfil.');
      },
    });
  }
}
