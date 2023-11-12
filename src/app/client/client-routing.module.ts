import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { DepositComponent } from '../deposit/deposit.component';
export 
const clientroutes: Routes = [{ path : '', component:ClientComponent,canActivate:[DataUserGuard], children:[
  {
    path: 'config', component : ConfigProfileComponent,
  },
  {
    path: 'idee',  component: IdeeComponent, 
  },
  {
    path:'reclamation', component:ReclamationComponent,
  },
  { path: 'portefeuille', component: PortefeuilleComponent },
  {
    path: 'deposit', component : DepositComponent,
  }


]}];

@NgModule({
  imports: [RouterModule.forChild(clientroutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
