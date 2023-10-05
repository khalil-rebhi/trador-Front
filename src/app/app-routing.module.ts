import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontOfficeComponent } from './layouts/front-office/front-office.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      { path: '', redirectTo: '/client', pathMatch: 'full' },
     {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
