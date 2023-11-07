import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBook } from '../core/models/OrderBook';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  webSocket: WebSocket;
  orderBookData: OrderBook;
  candle = true;
  depth = false;
  spinner = true;

  constructor (private router : Router) {
  }
  
  ngOnInit(): void {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/orderBook/CRYPTO/BTCUSD');
    this.webSocket.onmessage = (event) => {
      this.orderBookData = JSON.parse(event.data)  
      this.spinner = false;    
    };
  }
  
  toDepthChart(){
    this.candle = false;
    this.depth = true;
    //this.router.navigateByUrl(`/trador/market/depth?orderBookData=${JSON.stringify(this.orderBookData)}`)
  }

  toCandle(){
    this.candle = true;
    this.depth = false;
    //this.router.navigateByUrl("/trador/market/candle")
  }

}
