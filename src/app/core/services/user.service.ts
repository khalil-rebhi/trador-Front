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
    return this.http.post<Client>('http://localhost:8089/trador/user/add',user)
  }

  public sendEmail(email  : string) {
    return this.http.post<string>('http://localhost:8089/trador/user/send-verification-code', email)
  }

  public verifyCode(code : string, email : string){
    return this.http.post<any>('http://localhost:8089/trador/user/verify-code?verificationCode='+code,email)
  }

  public resetPassword(credentials: {email : string, newPass : string}){
    return this.http.post('http://localhost:8089/trador/user/changePassword', credentials);
  }

  
  
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:8089/trador/user/remove/${userId}`);
  }

  public updateUser(user: Client): Observable<Client> {
    return this.http.put<Client>(`http://localhost:8089/trador/user/edit/${user.idUser}`, user);
  }

  retrieveUser(userId: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8089/trador/user/show/${userId}`);
  }
  

  getAllUsers(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8089/trador/user/show');
  }

}

