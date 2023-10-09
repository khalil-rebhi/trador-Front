import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedin$ : ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client |null>(null);

  constructor(private http : HttpClient) { }

  public login(credentials:{email:string,password:string}) : Observable<Client>{
    return this.http.post<Client>('http://localhost:8089/trador/auth/login',credentials)
  }
}
