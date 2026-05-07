import { Component } from '@angular/core';

@Component({
  selector: 'app-form-photo',
  imports: [],
  templateUrl: './form-photo.html',
  styleUrl: './form-photo.scss',
})
export class FormPhoto {
  selectedFile: File | null = null;
  previewUrl: string | null = null;

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

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log('upload', formData);
  }
}
