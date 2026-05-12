import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { SidebarProfile } from '../components/sidebar-profile/sidebar-profile';
import { RouterOutlet } from '@angular/router';
import { ProfileStoreService } from '../services/profile-store.service';

@Component({
  selector: 'app-profile',
  imports: [SidebarProfile, RouterOutlet],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private readonly profileStore = inject(ProfileStoreService);
  async ngOnInit() {
    await this.profileStore.loadProfile();
  }
}
