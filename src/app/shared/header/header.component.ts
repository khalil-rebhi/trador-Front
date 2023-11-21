import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Client } from 'src/app/core/models/Client';
import { Portefeuille } from 'src/app/core/models/Portefeuille';
import { PortefeuilleService } from 'src/app/core/services/portefeuille.service';
import { UserService } from 'src/app/core/services/user.service';
import { logout } from 'src/app/store/actions/user.action';

declare var $: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();


  public showSearch = false;
  public user : Client;
  public portefeuille : Portefeuille ;
  static profileimage: any;
  static profilesolde: number;
  solde : number ;
  constructor(private modalService: NgbModal, private store : Store<any> , private router:Router,private notifier : NotificationsService, private userService : UserService, private portefeuilleService : PortefeuilleService) {
    this.store.subscribe(result => {this.user = result.user.user})
  }

  ngAfterViewInit() { }

  ngOnInit() {
    HeaderComponent.profileimage = 'http://localhost:8089/trador/user/getpicture/'+this.user.photo;
    this.portefeuilleService.getPortefeuilleByUser(this.user.idUser).subscribe((portefeuille) => {
      HeaderComponent.profilesolde = portefeuille.solde;
      this.solde = portefeuille.solde;
    });
  }

  get profileimage() {
    return HeaderComponent.profileimage;
  }

  get profilesolde() {
    return HeaderComponent.profilesolde;
  }

  get soldeportefeuille(){
    return this.portefeuille.solde;
  }

  logout(){
    this.store.dispatch(logout());
    this.notifier.error('Deconnexion', 'vous avez deconnecté  ',{
      timeOut: 5000,
      animate: 'fromRight',
      position: ['centered-notification']
    });
  }


  toprofile(){
    this.router.navigateByUrl("/trador/client/config")
    
  }

  toOrderBook(){
    this.router.navigateByUrl("/trador/client/orderBook")

  }
  toMarket(){
    this.router.navigateByUrl("/trador/market/candle")
  }

  todepot(){
    this.router.navigateByUrl("/trador/client/deposit")
  }

  tohistorique(){
    this.router.navigateByUrl("/trador/client/orderbook") 
  }

  towallet(){
    this.router.navigateByUrl("/trador/client/wallet") 
  }
}
