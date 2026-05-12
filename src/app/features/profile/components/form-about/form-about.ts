import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProfileStoreService } from '../../services/profile-store.service';
import type { AboutDto } from '../../dto/about.dto';
import { ProfileApiService } from '../../services/profile-api.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './form-about.html',
  styleUrl: './form-about.scss',
})
export class FormAbout {
  private readonly fb = inject(FormBuilder);
  private readonly profileStore = inject(ProfileStoreService);
  private readonly profileApi = inject(ProfileApiService);
  private readonly notification = inject(NotificationService);

  readonly profile$ = this.profileStore.profile;

  isLoading = false;

  form = this.fb.group({
    role: ['', [Validators.required]],
    objective: [''],
    skills: [''],
    bio: ['', [Validators.required, Validators.minLength(10)]],
  });

  private readonly syncProfileEffect = effect(() => {
    const profile = this.profile$();
    if (!profile?.about) return;

    this.form.patchValue({
      role: profile.about.role ?? '',
      objective: profile.about.objective ?? '',
      skills: profile.about.skills?.join(', ') ?? '',
      bio: profile.about.bio ?? '',
    });
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

    const raw = this.form.getRawValue();

    const about: AboutDto = {
      role: raw.role ?? undefined,
      objective: raw.objective ?? undefined,
      bio: raw.bio ?? undefined,
      skills:
        raw.skills
          ?.split(',')
          .map((s) => s.trim())
          .filter(Boolean) ?? [],
    };

    this.profileApi.updateMyAbout(about).subscribe({
      next: () => {
        this.profileStore.loadProfile();

        this.notification.success('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        this.notification.apiError(err, 'Erro ao atualizar perfil. Tente novamente.');
      },
    });
  }
}
