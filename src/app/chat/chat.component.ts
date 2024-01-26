import { Component, OnInit } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ChatServiceService } from '../chat-service.service';
import { Client } from '../core/models/Client';
import { UserService } from '../core/services/user.service';

export interface Message {
    
  content: string;
  senderId: Client;
  receiverId: Client;
 
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  senderId: number = 3; // Remplacez par l'ID du sender
  receiverId: number = 6; // Remplacez par l'ID du receiver
  conversation : any []= [] ;
  users: any[] = [];
  selectedUserId: number | undefined;
  messagesReceiver: any[] = [];
  mergedMessages: any[] = [];
   
  constructor(private chatService : ChatServiceService, private userService : UserService ){}



  ngOnInit(): void {
    this.chatService.getMessageStream().subscribe((message) => {
      // Ajouter le message reçu à la liste des messages
      this.messages.push(message);
    });

   // console.log("les messages"+JSON.stringify(this.messages));
    
   this.getUsers() ;

  //  console.log("merged"+JSON.stringify(this.mergedMessages));

   //this.loadMessagesReceiver(6);
   //console.log("les conversations " + JSON.stringify(this.conversation));
   
   
  }
  sendMessage() {
    // Créer et envoyer un nouveau message
    const message = {
      content: this.newMessage,
     // senderId: { idUser: 1 /* ID de l'utilisateur expéditeur */ } as Client // Remplacez par l'ID de l'expéditeur
     // receiverId: '6' // Remplacez par l'ID du destinataire
    };
    this.chatService.sendMessage(message);
    this.chatService.saveMessageLocally(message);
    this.messages.push(message);
    this.newMessage = '';
    console.log("message"+JSON.stringify(message));
    console.log("new message"+this.newMessage);
    
   
  
    
     // Effacer le champ de saisie après l'envoi
  }

  // getMessages() {
  //   this.chatService.getMessagesBySenderAndReceiver(this.senderId, this.receiverId)
  //     .subscribe(
  //       (response) => {
  //         this.messages = response;
  //         console.log('Messages:', this.messages);
  //       },
  //       (error) => {
  //         console.error('Error fetching messages:', error);
  //       }
  //     );
  // }

  getUsers() {
    this.userService.getAllUsers()
      .subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  loadMessages(userId: number) {
    if (userId) {
      this.chatService.getMessagesBySenderAndReceiver( this.senderId,userId)
        .subscribe(
          (response) => {
            this.messages = response;
            console.log('Messages:', this.messages);
          },
          (error) => {
            console.error('Error fetching messages:', error);
          }
        );
    }
  }

  loadMessagesReceiver(userId: number) {
    if (userId) {
      this.chatService.getMessagesBySenderAndReceiver(userId, this.senderId)
        .subscribe(
          (response) => {
            this.messagesReceiver = response;
            console.log('Messages receivers:', this.messagesReceiver);
          },
          (error) => {
            console.error('Error fetching messages:', error);
          }
        );
    }
  }

  loadMessagesAndReceiver(userId: number) {
    this.loadMessages(userId);
    this.loadMessagesReceiver(userId);
  }

  // mergeAndSortMessages() {
  //   const allMessages = [...this.messages, ...this.messagesReceiver];
  //   allMessages.sort((a, b) => (a.id < b.id ? -1 : 1));
  //   this.messages = allMessages;
  //   this.messagesReceiver=allMessages;
  // }

  mergeAndSortMessages() {
    this.mergedMessages = [...this.messages, ...this.messagesReceiver];
    this.mergedMessages.sort((a, b) => a.id - b.id);
    console.log("merged"+this.mergedMessages);
    
  }
 

}
