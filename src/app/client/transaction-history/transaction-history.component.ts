// transaction-history.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  public transactions: any;
  public selectedType: string = ""; // Initialisation de selectedType à une chaîne vide

  constructor(private transactionservice: TransactionService, private userservice: UserService ,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTransactionByPortefeuilleId(Number(localStorage.getItem("id")));
  }

  getTransactionByPortefeuilleId(userId: any) {
    this.transactionservice.getTransactionById(userId).subscribe((data: any) => {
      this.transactions = data;
      this.filterTransactions();

      console.log("***", this.transactions);
    });
  }

  filterTransactions() {
    if (this.selectedType) {
      this.transactions = this.transactions.filter((transaction: any) => transaction.type === this.selectedType);
    }
  }

  

  onTypeChange(type: string) {
    this.selectedType = type;
    this.filterTransactions();
    this.cdr.detectChanges();
  }
}
