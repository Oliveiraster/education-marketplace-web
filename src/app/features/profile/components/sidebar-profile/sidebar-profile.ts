import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-profile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-profile.html',
  styleUrl: './sidebar-profile.scss',
})
export class SidebarProfile {}
