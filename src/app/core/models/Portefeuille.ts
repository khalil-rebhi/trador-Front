export class Portefeuille{
    idPortefeuille:number;
    solde:number;
    datecreation:Date;
    devise:string;
}

export class Transaction {
    idTransaction: number;
    datetransaction: Date;
    montant: number;
    type: string;
    portefeuille: Portefeuille;  // Ajouter cette ligne pour la relation ManyToOne
  }