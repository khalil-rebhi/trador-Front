import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Portefeuille } from '../models/Portefeuille';
import { PortefeuilleAction } from '../models/PortefeuilleAction';
@Injectable({
  providedIn: 'root'
})
export class PortefeuilleService {
  host :string = 'http://localhost:8089';
  public isLoggedin$ : ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client |null>(null);
  private accessToken: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http : HttpClient, private store: Store<any>) {
  }
    public login(credentials:{email:string,password:string}) : Observable<Client>{
      return this.http.post<Client>('http://localhost:8089/trador/auth/login',credentials)
   }

  public getPortefeuilleByUser(idUser : number) : Observable<Portefeuille>{
    return this.http.get<Portefeuille>(`http://localhost:8089/trador/portefeuille/show/user/${idUser}`);
  }

  public deposit(amount : number){
    return this.http.get("http://localhost:8089/trador/portefeuille/deposit/" + amount);
  }

  public updatePortefeuilleBalance(formData: any): Observable<Portefeuille> {
    return this.http.put<Portefeuille>("http://localhost:8089/trador/portefeuille/updatebalance", formData);
  }

  public getPortefeuilleActionByPortefeuille(idPortefeuille: number): Observable<PortefeuilleAction> {
    return this.http.get<PortefeuilleAction>("http://localhost:8089/trador/action/portefeuille/showByPortefeuille/" + idPortefeuille);
  }
}
