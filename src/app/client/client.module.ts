import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/effects/user.effects';
import { RouterModule, Routes } from '@angular/router';
import { clientroutes } from './client-routing.module';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    ConfigProfileComponent,
    IdeeComponent,
    ReclamationComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
   //RouterModule.forRoot(clientroutes, { useHash: false }),
  
    
  ]
})
export class ClientModule { }
