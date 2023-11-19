import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  public transactions : any;
  constructor (private transactionservice : TransactionService, private userservice : UserService) {}
  ngOnInit(): void {
    
   this.getTransactionByPortefeuilleId(Number(localStorage.getItem("id")));

  }

 

  getTransactionByPortefeuilleId(userId : any){
    this.transactionservice.getTransactionById(userId).subscribe((data:any)=> {
      this.transactions=data
      console.log ("***",this.transactions)
    })
  }
}
