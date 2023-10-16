import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ConfigProfileComponent } from './client/config-profile/config-profile.component';

export const Approutes: Routes = [
  {
    path : '',
    children: [
      {path : '', component: LandingComponent},
      {path : 'login', component : LoginComponent},
      {path : 'signup', component : SignupComponent}
    ]
  },
  {
    path: 'trador',
    //canActivate : [AuthGuard],
    component: FrontOfficeComponent,
    children: [
      { path: 'trador', redirectTo: '/client', pathMatch: 'full' },
     {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      },
      {path: 'editclient' , component:ConfigProfileComponent}
      
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
