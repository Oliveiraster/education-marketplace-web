import { Component } from '@angular/core';
import { SidebarProfile } from './components/sidebar-profile/sidebar-profile';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [SidebarProfile, RouterOutlet],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
