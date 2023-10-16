import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { FormsModule } from '@angular/forms';


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
    
  ]
})
export class ClientModule { }
