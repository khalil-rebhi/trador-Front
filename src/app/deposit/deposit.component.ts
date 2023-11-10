import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { Portefeuille } from '../core/models/Portefeuille';
import { Client } from '../core/models/Client';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '../shared/header/header.component';
//import * as Razorpay from 'razorpay';
declare var Razorpay :any;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {

  amount : number;
  result : number;
  public portefeuille : Portefeuille ;
  solde : number ;
  idUser : number ;
  public user : Client;
  constructor( private store : Store<any> , private userService : UserService) {
    this.store.subscribe(result => {this.user = result.user.user})
  }

  ngAfterViewInit() { }

  ngOnInit() {
    if (this.user) {
      this.userService.getPortefeuilleByUser(this.user.idUser).subscribe((portefeuille) => {
        this.solde = portefeuille.solde;
        console.log(this.solde);
      });
    } else {
      console.error("User is undefined");
    }
  }

  depositAndPlaceOrder(form : NgForm) {
      let amount = this.amount;
      this.userService.deposit(amount).subscribe((response) => {
        console.log(response);
        this.openDepositModal(response);
      },
      (error)=> {
        console.log(error);
      });
  }

  openDepositModal(response : any){
  var options = {
    order_id : response.order_id,
    key : response.key,
    amount : response.amount,
  currency : response.currency,
name : 'Deposit NOW' ,
description : 'Trador is the best app to trade',
image : 'https://media.istockphoto.com/id/1426308349/fr/photo/vue-rapproch%C3%A9e-des-mains-qui-sortent-de-largent-dun-portefeuille.webp?b=1&s=612x612&w=0&k=20&c=-Z19iFMTAJfjyjvH3nUp2nkY01DPQ8GILIvtjubnxi0=',
handler: (response : any) =>{
  this.processResponse(response);
  const formData = new FormData();
  formData.append('idUser', this.user.idUser.toString());
  formData.append('amount', this.amount.toString());
  this.userService.updatePortefeuilleBalance(formData).subscribe((response) => {
    console.log(response);
    
    HeaderComponent.profilesolde = this.solde + this.amount;
  },
  (error)=> {
    console.log(error);
  });

  //this.solde = this.solde + this.amount;
  console.log(this.solde);
},
prefill : {
  name : 'LPY',
  email : 'LPY@GMAIL.COM',
  contact : '90909090',
  upi :'success@razorpay'
},
notes : {
  address : 'Trador Application'
},
theme: {
  color: '#F37254'
}
  };

var razorPayObject = new Razorpay(options);
razorPayObject.open();
  }

  processResponse(resp : any ){
    console.log(resp);
  }
}
