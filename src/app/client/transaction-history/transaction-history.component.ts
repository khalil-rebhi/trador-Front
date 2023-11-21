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
  public transactions: any[] = []; // Initialisez le tableau pour éviter les problèmes potentiels
  public originalTransactions: any[] = []; // Ajoutez un tableau pour stocker la liste originale
  public selectedType: string = "";

  constructor(private transactionservice: TransactionService, private userservice: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTransactionByPortefeuilleId(Number(localStorage.getItem("id")));
  }

  getTransactionByPortefeuilleId(userId: any) {
    this.transactionservice.getTransactionById(userId).subscribe((data: any) => {
      this.originalTransactions = data;
      this.filterTransactions();
      console.log("***", this.transactions);
    });
  }

  filterTransactions() {
    // Utilisez la copie originale pour appliquer le filtre
    this.transactions = this.selectedType
      ? this.originalTransactions.filter((transaction: any) => transaction.type === this.selectedType)
      : [...this.originalTransactions]; // Si aucun type sélectionné, copiez tous les éléments

    this.cdr.detectChanges();
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.filterTransactions();
  }
}
