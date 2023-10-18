import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] ;
  selectedUser: User | null = null;
  modalOpen = false; // Variable pour stocker les détails de l'utilisateur sélectionné

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  supprimerUtilisateur(userId: number) {
    
  }

  consulterUtilisateur(user: User) {
    this.selectedUser = user;
    this.modalOpen = true;
  }

  modifierUtilisateur(userId: number) {
    
  }
}
