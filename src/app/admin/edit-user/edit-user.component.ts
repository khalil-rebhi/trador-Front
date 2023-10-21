import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Client } from 'src/app/core/models/Client';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  user: Client;
  userId: number;
  modalVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id']; // Récupère l'ID de l'utilisateur depuis l'URL
      this.userService.retrieveUser(this.userId).subscribe((user) => {
        this.user = user;
        
      });
    });
  }
  

  saveChanges() {
    // Mettez en œuvre la logique pour sauvegarder les modifications ici
    // Utilisez this.user pour accéder aux valeurs modifiées
    this.userService.updateUser(this.user).subscribe(() => {
      // Redirigez l'utilisateur vers la liste des utilisateurs ou toute autre page appropriée
      this.router.navigate(['/list-users']);
    });
  }

   // Méthode pour afficher la modal
   showModal() {
    this.modalVisible = true;
  }

  // Méthode pour masquer la modal
  hideModal() {
    this.modalVisible = false;
    this.router.navigate(['/list-users']);
  }
}
