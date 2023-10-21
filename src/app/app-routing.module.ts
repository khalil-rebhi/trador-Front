import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ConfigProfileComponent } from './client/config-profile/config-profile.component';

import { ForgetComponent } from './shared/forget/forget.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

import { ListUsersComponent } from './admin/list-users/list-users.component';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';



export const Approutes: Routes = [
  {
    path : '',
    children: [
      {path : '', component: LandingComponent},
      {path : 'login', component : LoginComponent},
      {path : 'signup', component : SignupComponent},
      {path : 'forget', component : ForgetComponent},
      { path: 'edit-user/:id', component: EditUserComponent }
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
      
      
    ]
  },{
    path : 'admin',
    component : BackOfficeComponent,
    children : [
      {
        path : '', 
        loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
    }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
