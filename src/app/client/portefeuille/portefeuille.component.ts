import { Component } from '@angular/core';
import { Client } from 'src/app/core/models/Client';


@Component({
  selector: 'app-portfeuille',
  templateUrl: './portefeuille.component.html',
  styleUrls: ['./portefeuille.component.css']
})
export class PortefeuilleComponent {

  public user: Client ;
}
