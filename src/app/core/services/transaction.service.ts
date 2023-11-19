import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  host :string = 'http://localhost:8089';
  private accessToken: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };
  constructor(private http : HttpClient) { }
  getTransactionById(userId: any){
    return this.http.get(this.host+"/trador/transaction/"+userId,this.httpOptions)
  }
}
