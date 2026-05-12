import { Component, inject, computed, signal } from '@angular/core';
import { ProfileStoreService } from '../../services/profile-store.service';
import { ProfileApiService } from '../../services/profile-api.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-form-photo',
  imports: [],
  templateUrl: './form-photo.html',
  styleUrl: './form-photo.scss',
})
export class FormPhoto {
  private readonly profileStore = inject(ProfileStoreService);
  private readonly profileApi = inject(ProfileApiService);
  private readonly notification = inject(NotificationService);

  readonly profile = this.profileStore.profile;

  readonly selectedFile = signal<File | null>(null);
  readonly filePreview = signal<string | null>(null);

  readonly imageSrc = computed(() => {
    if (this.filePreview()) return this.filePreview();
    return this.profile()?.photo || 'assets/default-avatar.jpg';
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Arquivo inválido');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Máximo 2MB');
      return;
    }

    this.selectedFile.set(file);
    this.filePreview.set(URL.createObjectURL(file));
  }

  removePhoto() {
    const preview = this.filePreview();

    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    this.selectedFile.set(null);
    this.filePreview.set(null);
  }

  upload() {
    const file = this.selectedFile();

    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    this.profileApi.updateMyPhoto(formData).subscribe({
      next: () => {
        this.profileStore.loadProfile();
        this.notification.success('Foto atualizada!');

        setTimeout(() => this.removePhoto());
      },
      error: (err) => {
        this.notification.apiError(err, 'Erro ao atualizar foto');
      },
    });
  }
}
