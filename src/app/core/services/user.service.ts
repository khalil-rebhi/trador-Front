import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedin$ : ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client |null>(null);

  constructor(private http : HttpClient, private store: Store<any>) { }

  public login(credentials:{email:string,password:string}) : Observable<Client>{
    return this.http.post<Client>('http://localhost:8089/trador/auth/login',credentials)
  }

  public signup(user : Client) : Observable<Client>{
    console.log("service");
    console.log(user);
    
    return this.http.post<Client>('http://localhost:8089/trador/user/add',user)
  }
}
