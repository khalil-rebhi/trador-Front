import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Client } from 'src/app/core/models/Client';
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
  static profileimage: any;
  constructor(private modalService: NgbModal, private store : Store<any> , private router:Router,private notifier : NotificationsService) {
    this.store.subscribe(result => {this.user = result.user.user}
    )
  }

  ngAfterViewInit() { }

  ngOnInit() {
    HeaderComponent.profileimage = 'http://localhost:8089/trador/user/getpicture/'+this.user.photo;
  }

  get profileimage() {
    return HeaderComponent.profileimage;
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
}
