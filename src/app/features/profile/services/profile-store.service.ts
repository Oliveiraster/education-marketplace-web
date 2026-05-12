import { inject, Injectable, signal } from '@angular/core';
import { ProfileApiService } from './profile-api.service';
import { firstValueFrom } from 'rxjs';
import type { UserProfile } from '../interface/user-profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileStoreService {
  private readonly profileApi = inject(ProfileApiService);

  profile = signal<UserProfile | null>(null);

  async loadProfile() {
    const profile = await firstValueFrom(this.profileApi.findMyProfile());

    const dataTratamente = {
      ...profile,
      phone: profile.phone ? profile.phone.replace(/\D/g, '').replace(/^55/, '') : '',
      whatsapp: profile.whatsapp ? profile.whatsapp.replace(/\D/g, '').replace(/^55/, '') : '',
    };

    this.profile.set(dataTratamente);
    console.log('profile', dataTratamente);
  }
}
