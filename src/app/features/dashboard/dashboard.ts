import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  courses = [
    { title: 'JavaScript Completo', rating: 4.8, duration: '18h' },
    { title: 'TypeScript do Zero', rating: 4.9, duration: '14h' },
    { title: 'Node.js Completo', rating: 4.7, duration: '22h' },
    { title: 'UI/UX Design', rating: 4.9, duration: '12h' },
  ];
}
