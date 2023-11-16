import { Component, NgZone, OnInit } from '@angular/core';
import { OrderBook } from '../core/models/OrderBook';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../core/models/Data';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
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
  interval : '5min';
  spinner = true;

  constructor (private activatedRoute : ActivatedRoute,private zone: NgZone) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.market = params["market"];
      this.symbol = params["symbole"];

      this.orderBookWebSocket = new WebSocket(`ws://localhost:8089/trador/orderBook/crypto/btcusd`);
      this.graphWebSocket = new WebSocket(`ws://localhost:8089/trador/graph/${this.symbol}/${this.interval}`)
      this.orderBookWebSocket.onmessage = (event) => {
        this.zone.run(() => {
          this.orderBookData = JSON.parse(event.data);
        });
      };
      this.graphWebSocket.onmessage = (event) => {
        this.zone.run(() => {
          this.graphData = JSON.parse(event.data);
        });
      }
      this.spinner = false;
    })
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
