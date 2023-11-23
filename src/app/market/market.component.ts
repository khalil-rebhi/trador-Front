import { Component, NgZone, OnInit } from '@angular/core';
import { OrderBook } from '../core/models/OrderBook';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../core/models/Data';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  animations : [
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200))
    ])
  ]
})
export class MarketComponent implements OnInit {
  orderBookWebSocket: WebSocket;
  graphWebSocket : WebSocket;
  orderBookData: OrderBook;
  graphData : Data;
  candle = true;
  depth = false;
  market : string;
  symbol : string;
  interval = "1day";
  spinner = true;
  showOrderBook = true;

  myMap: Map<string, string> = new Map<string, string>();
  
  constructor (private activatedRoute : ActivatedRoute,private zone: NgZone) {
    this.myMap.set('1 day', '1day');
    this.myMap.set('1 week', '1week');
    this.myMap.set('2 weeks', '2weeks');
    this.myMap.set('1 month', '1month');
    this.myMap.set('3 months', '3months');
    this.myMap.set('6 months', '6months');
    this.myMap.set('1 year', '1year');
  }

  
  mapEntries(): { key: string, value: string }[] {
    return Array.from(this.myMap.entries()).map(([key, value]) => ({ key, value }));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.market = params["market"];
      this.symbol = params["symbole"];
      this.connectGraphWebSocket();
      this.connectOrderBook();
    })
  }

  connectOrderBook(){
    this.orderBookWebSocket = new WebSocket(`ws://localhost:8089/trador/orderBook/crypto/btcusd`);
    this.orderBookWebSocket.onmessage = (event) => {
      this.zone.run(() => {
        this.orderBookData = JSON.parse(event.data);
      });
    };
  }
  connectGraphWebSocket(){
    this.graphWebSocket = new WebSocket(`ws://localhost:8089/trador/graph/${this.market}/${this.symbol}/${this.interval}`)
    this.graphWebSocket.onmessage = (event) => {
      this.zone.run(() => {
        this.graphData = JSON.parse(event.data);
        this.spinner = false;
      });
    }
  }
  
  toDepthChart(){
    this.candle = false;
    this.depth = true;
  }

  toCandle(){
    this.candle = true;
    this.depth = false;
  }

  changeIntervalle(interval : string){
    if(this.graphWebSocket.OPEN){
      this.graphWebSocket.close()
    }
    this.interval = interval;
    this.connectGraphWebSocket();
  }

  toggleOrderBook(){
    this.showOrderBook = !this.showOrderBook;
  }

  placeBid(){

  }
  placeAsk(){}

}
