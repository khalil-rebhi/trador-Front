import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Client } from '../../core/models/Client';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/store/actions/user.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: Client[] ;
  selectedUser: Client | null = null;
  modalOpen = false;
  confirmationModalOpen = false;
  userToDelete: Client | null = null;

  constructor(private userService: UserService , private datePipe : DatePipe, private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: Client[]) => {
      this.users = data;
    });
  }

  consulterUtilisateur(user: Client) {
    this.selectedUser = user;
    this.modalOpen = true;
  }

  modifierUtilisateur(user: Client) {
    this.selectedUser = user;
    this.modalOpen = true;
  }
  
  confirmerSuppression() {
    if (this.userToDelete) {
      // Utilisez this.userToDelete pour supprimer l'utilisateur
      this.userService.deleteUser(this.userToDelete.idUser).subscribe(() => {
        // Mettez à jour la liste d'utilisateurs ou effectuez d'autres actions nécessaires
        this.userToDelete = null;
        this.confirmationModalOpen = false;
      });
    }
  }

  annulerSuppression() {
    this.userToDelete = null;
    this.confirmationModalOpen = false;
  }

  supprimerUtilisateur(user: Client) {
    this.userToDelete = user;
    this.confirmationModalOpen = true;
  }

  getFormattedDate(date ?: Date ){
    if(date){
      return this.datePipe.transform(date, 'dd-MM-yyyy')
    }
    return '--'
  }
 
  openEditModal(user: User) {
    const modalRef = this.modalService.open(EditUserComponent, { size: 'lg' }); // Utilisez NgbModal pour ouvrir le modal.
    modalRef.componentInstance.userToEdit = user; // Passez l'utilisateur à éditer au composant du modal.
  }

}
