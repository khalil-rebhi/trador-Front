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
    return this.http.put<Client>('http://localhost:8089/trador/user/edit/'+ client.IdClient , client);
  }

  public getClient(client:Client){
    return this.http.get('http://localhost:8089/trador/user/show/'+client.IdClient);
  }

  public uploadPhoto(idUser:number){
    return this.http.post('http://localhost:8089/trador/user/uploadProfilePicture/'+idUser,this.updateClient);
  }
  public addreclamation(Reclamation:Reclamation){
    return this.http.post('http://localhost:8089/trador/reclamation/addReclamation',Reclamation);
  }

}
