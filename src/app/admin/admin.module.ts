import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
