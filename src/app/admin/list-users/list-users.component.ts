import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Client } from '../../core/models/Client';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: Client[] ;
  selectedUser: Client | null = null;
  modalOpen = false;

  constructor(private userService: UserService , private datePipe : DatePipe) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: Client[]) => {
      this.users = data;
    });
  }
  supprimerUtilisateur(userId: number) {
    
  }

  consulterUtilisateur(user: Client) {
    this.selectedUser = user;
    this.modalOpen = true;
  }

  modifierUtilisateur(userId: number) {
    
  }

  getFormattedDate(date ?: Date ){
    if(date){
      return this.datePipe.transform(date, 'dd-MM-yyyy')
    }
    return '--'
  }

}
