import { Component, OnInit } from '@angular/core';
import { TraderComponentStore } from './store/Trader.component-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private webSocket : WebSocket;

  constructor(private readonly tradeStore : TraderComponentStore) {
    
  }
  ngOnInit(): void {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/ticker/TSLA');
    this.webSocket.onmessage = (event) => {
      this.tradeStore.updateTrader(JSON.parse(event.data));
  }
  }
  title = 'trador';
}
