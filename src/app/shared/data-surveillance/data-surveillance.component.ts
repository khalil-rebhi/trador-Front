import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarData } from 'src/app/core/models/SideBarData';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, RouterLink } from '@angular/router';
import { quotes } from './quotes';
import { SymboleStore } from 'src/app/store/SymboleStore';

@Component({
  selector: 'app-data-surveillance',
  standalone : true,
  imports : [CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css'],
  providers: []
})
export class DataSurveillanceComponent implements OnInit {
  datas : {
    FOREX : SideBarData[],
    STOCKS : SideBarData[],
    CRYPTOCURRENCY : SideBarData[]
  };
  forex : SideBarData[];
  stocks : SideBarData[];
  cryptos : SideBarData[];
  webSocket: WebSocket;
  spinner = true;
  increase = true;
  currentDate: string | null;
  motivation : string;
  day : string | undefined;
  date : string | undefined;
  time : string | undefined;

  constructor(private datePipe: DatePipe, private router : Router, private readonly sideBarState : SymboleStore) {
  }

  ngOnInit(): void {
    this.timeAndQuote();
    this.webSocket = new WebSocket("ws://localhost:8089/trador/sidebar");
    this.webSocket.onmessage = (event) => {
      this.datas = JSON.parse(event.data);
      this.sideBarState.updateState(this.datas);
      this.cryptos = this.datas.CRYPTOCURRENCY;
      this.forex = this.datas.FOREX;
      this.stocks = this.datas.STOCKS;
      this.spinner = false;
    }
  }


  navigateToMarket(market: string, symbol: string): void {
    const routeUrl = `/trador/market/${market}/${symbol}`;
    
    // Navigate to the route
    this.router.navigate([routeUrl]);
  }

  timeAndQuote(){
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), "EEEE dd MMMM yyyy HH:mm:ss");
      this.day = this.currentDate?.split(" ")[0];
      this.date = this.currentDate?.split(" ")[1]+' '+this.currentDate?.split(" ")[2]+' '+this.currentDate?.split(" ")[3];
      this.time = this.currentDate?.split(" ")[4];
    }, 1000);
    let index = 1;
    this.motivation = quotes[0];
    setInterval(() => {
      if (index == quotes.length) {
        index = 0;
      }
      this.motivation = quotes[index];
      index++;
    },25000);
  }
}


