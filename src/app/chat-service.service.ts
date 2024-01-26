import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private wsSubject: WebSocketSubject<any>;
  private apiUrl = `http://localhost:8089/trador/chat/addMessage`;

  constructor(private http: HttpClient) {
    this.wsSubject = webSocket('ws://localhost:8089/trador/chat');
   }

   sendMessage(message: any) {
   

    this.wsSubject.next(message);
  }

  getMessageStream() {
    return this.wsSubject.asObservable();
  }

   saveMessageLocally(message: any) {
    // Effectuez une requête HTTP pour sauvegarder le message dans la base de données via votre API backend
    this.http.post(this.apiUrl, message).subscribe(
      (response) => {
        console.log('Message saved successfully:', response);
      },
      (error) => {
        console.error('Error saving message:', error);
      }
    );
  }

  getMessagesBySenderAndReceiver(senderId: number, receiverId: number) {
    return this.http.get<any[]>(`http://localhost:8089/trador/chat/messages/${senderId}/${receiverId}`);
  }
}
