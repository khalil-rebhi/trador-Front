import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';

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
  }


]}];

@NgModule({
  imports: [RouterModule.forChild(clientroutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
