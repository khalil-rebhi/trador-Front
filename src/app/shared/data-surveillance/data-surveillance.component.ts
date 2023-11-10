import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarData } from 'src/app/core/models/SideBarData';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-data-surveillance',
  standalone : true,
  imports : [CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent implements OnInit {
  datas : {
    Forex : SideBarData[],
    Stocks : SideBarData[],
    Cryptocurrency : SideBarData[]
  };
  forex : SideBarData[];
  stocks : SideBarData[];
  cryptos : SideBarData[];
  webSocket: WebSocket;
  spinner = true;
  increase = true;
  currentDate: string | null;

  constructor(private datePipe: DatePipe, private router : Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'EEEE dd MMMM yyyy HH:mm:ss');
    }, 1000);

    this.webSocket = new WebSocket("ws://localhost:8089/trador/sidebar");
    this.webSocket.onmessage = (event) => {
      this.datas = JSON.parse(event.data)
      this.cryptos = this.datas.Cryptocurrency;
      this.forex = this.datas.Forex;
      this.stocks = this.datas.Stocks;
      this.spinner = false;
    }
  }


  navigateToMarket(market: string, symbol: string): void {
    const routeUrl = `/trador/market/${market}/${symbol}`;
    
    // Navigate to the route
    this.router.navigate([routeUrl]);
  }

}


