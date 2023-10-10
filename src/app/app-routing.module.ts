import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { LoginComponent } from './shared/login/login.component';

export const Approutes: Routes = [
  {
    path : '',
    children: [
      {path : 'login', component : LoginComponent}
    ]
  },
  {
    path: 'trador',
    canActivate : [AuthGuard],
    component: FrontOfficeComponent,
    children: [
      { path: 'trador', redirectTo: '/client', pathMatch: 'full' },
     {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }
    ]
  },
  {
    path: 'skander',
    component: FrontOfficeComponent,
    children: [
      { path: 'trador', redirectTo: '/client', pathMatch: 'full' },
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
