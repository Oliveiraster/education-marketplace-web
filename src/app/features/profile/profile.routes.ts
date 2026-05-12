import type { Routes } from '@angular/router';
import { Profile } from './pages/profile';
import { FormPhoto } from './components/form-photo/form-photo';
import { FormAbout } from './components/form-about/form-about';
import { FormPersonal } from './components/form-personal/form-personal';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: Profile,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },

      {
        path: 'about',
        component: FormAbout,
      },

      {
        path: 'photo',
        component: FormPhoto,
      },

      {
        path: 'personal',
        component: FormPersonal,
      },
    ],
  },
];
