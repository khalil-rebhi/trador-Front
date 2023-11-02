import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { PortfeuilleComponent } from './portfeuille/portfeuille.component';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    ConfigProfileComponent,
    IdeeComponent,
    ReclamationComponent,
    OrderBookComponent,
    PortfeuilleComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    SpinnerComponent
   //RouterModule.forRoot(clientroutes, { useHash: false }),
  
    
  ],
  providers: [DatePipe]
})
export class ClientModule { }
