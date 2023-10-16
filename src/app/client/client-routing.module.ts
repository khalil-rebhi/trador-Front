import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

const routes: Routes = [{ path : '', component:ClientComponent, children:[
  {
    path: 'config',
    component : ConfigProfileComponent,
    
  },{
    path: 'idee', // Le nouveau chemin que vous souhaitez ajouter
    component: IdeeComponent, // Composant associé au nouveau chemin
  },
  {
    path:'reclamation',
    component:ReclamationComponent,
  }


]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
