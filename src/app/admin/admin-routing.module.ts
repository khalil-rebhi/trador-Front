import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { EduAdminComponent } from './edu-admin/edu-admin.component';

const routes: Routes = [
  {path : 'users' , component : ListUsersComponent},

  {path:'educ',component:EduAdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
