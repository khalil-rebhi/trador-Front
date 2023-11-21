import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Action } from '../models/Action';
@Injectable({
  providedIn: 'root'
})
export class ActionService {
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

  public getActionById(idAction : number) : Observable<Action>{
    return this.http.get<Action>("http://localhost:8089/trador/action/show/" + idAction);
  } 


}
