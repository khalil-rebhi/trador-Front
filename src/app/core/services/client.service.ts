import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) {   }

  public updateClient( client:Client ):Observable<Client>{    
    return this.http.put<Client>('http://localhost:8089/trador/user/edit/'+ client.idUser , client);
  }

  public getClient(user : Client) : Observable<Client>{
    return this.http.get<Client>('http://localhost:8089/trador/user/show/'+user.idUser);
  }

  public uploadPhoto(idUser:number){
    return this.http.post('http://localhost:8089/trador/user/uploadProfilePicture/'+idUser,this.updateClient);
  }
  public addreclamation(Reclamation:Reclamation){
    return this.http.post('http://localhost:8089/trador/reclamation/addReclamation',Reclamation);
  }

  public checkPassword(user : Client, password : string) : Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8089/trador/user/verifyOldPassword/"+user.idUser, password);
  }

}
