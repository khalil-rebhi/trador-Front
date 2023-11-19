import { Component } from '@angular/core';
import { PortefeuilleAction } from '../core/models/PortefeuilleAction';
import { Action } from '../core/models/Action';
import { Portefeuille } from '../core/models/Portefeuille';
import { PortefeuilleService } from '../core/services/portefeuille.service';
import { ActionService } from '../core/services/action.service';
import { Store } from '@ngrx/store';
import { Client } from '../core/models/Client';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  public portefeuilleActions : PortefeuilleAction[];
  public action : Action ;
  public portefeuille : Portefeuille;
  idPortefeuille : number ;
  public user : Client;
  idUser : number;
  response : any;
  
  constructor(private store : Store<any> , private portefeuilleService: PortefeuilleService , private actionService : ActionService) {
    this.store.subscribe(result => {this.user = result.user.user})
  }

  ngOnInit() {
    if (this.user) {
      this.portefeuilleService.getPortefeuilleByUser(this.user.idUser).subscribe((response) => {
        this.idPortefeuille = response.idPortefeuille;
        this.portefeuilleActions = [];
        this.portefeuilleService.getPortefeuilleActionByPortefeuille(this.idPortefeuille).subscribe((response : any) => {
          this.portefeuilleActions = response;
        },
        (error) => {        
          console.log(error);
        });
      });
    } else {
      console.error("User is undefined");
    }
    }
}
