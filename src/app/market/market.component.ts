import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBook } from '../core/models/OrderBook';
import { TraderComponentStore } from '../store/Trader.component-store';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  orderBookWebSocket: WebSocket;
  marketWebSocket : WebSocket;
  orderBookData: OrderBook;
  candle = true;
  depth = false;
  spinner = true;

  constructor (private tradeStore : TraderComponentStore) {
  }
  
  ngOnInit(): void {
    this.orderBookWebSocket = new WebSocket('ws://localhost:8089/trador/orderBook/CRYPTO/BTCUSD');
    this.orderBookWebSocket.onmessage = (event) => {
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
