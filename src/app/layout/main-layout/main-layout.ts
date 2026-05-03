import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Menu } from '../../shared/components/menu/menu';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterModule, Menu, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
