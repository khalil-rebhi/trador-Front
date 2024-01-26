import { Client } from "./Client";

export interface Message {
    
    content: string;
    senderId: Client;
    receiverId: Client;
   
  }