import { Component } from '@angular/core';
import { OrderBook } from 'src/app/core/models/OrderBook';


@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent {
 
 
  orderBookData: OrderBook ;

  private webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/orderBook/CRYPTO/BTCUSD');
    this.webSocket.onmessage = (event) => {
      this.orderBookData = JSON.parse(event.data)
    };
  } 




}
