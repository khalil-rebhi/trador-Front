import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { EduAdminComponent } from './edu-admin/edu-admin.component';




@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent,
    EditUserComponent,
    EduAdminComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
