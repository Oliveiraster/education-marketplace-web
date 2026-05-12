import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { UserProfile } from '../interface/user-profile.interface';
import type { AboutDto } from '../dto/about.dto';
import type { PersonalDto } from '../dto/personal.dto';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly http = inject(HttpClient);
  private API_URL = 'http://localhost:5000/api';

  findMyProfile() {
    return this.http.get<UserProfile>(`${this.API_URL}/profile`);
  }

  updateMyAbout(about: AboutDto) {
    return this.http.put(`${this.API_URL}/profile/about`, about);
  }

  updateMyPersonal(personal: PersonalDto) {
    return this.http.put(`${this.API_URL}/profile/personal`, personal);
  }

  updateMyPhoto(photo: FormData) {
    return this.http.put(`${this.API_URL}/profile/avatar`, photo);
  }
}
