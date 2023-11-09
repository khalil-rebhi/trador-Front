import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/Data';
import { TraderComponentStore } from 'src/app/store/Trader.component-store';

@Component({
  selector: 'app-data-surveillance',
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent implements OnInit {
  Data: Data;
  TSLA: string = "TSLA";
  Google: string = "GOOGL";
  Total: string = "TTE";
  chg: any;
  chgPercent: number;
  lastCloseValue: number;
  refreshInterval: number = 5000;
  webSocket: WebSocket;
  increase = true;
  currentDate: string | null;






  constructor(private datePipe: DatePipe, private readonly tradeStore: TraderComponentStore) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'EEEE dd MMMM yyyy HH:mm:ss');
    }, 1000); // Update every 1 second

    this.tradeStore.trader$.subscribe(result => {
      this.Data = result;      
      if (this.Data) {
        const timeSeries = this.Data['Time Series (1min)'];
        const dates = Object.keys(timeSeries);


        const firstDate = dates[0];
        const lastDateTime = dates[dates.length - 1];


        const openValue = timeSeries[firstDate]['1. open'];
        const closeValue = timeSeries[firstDate]['4. close'];

        this.chg = (closeValue - openValue).toFixed(3);

        this.chgPercent = Number(((this.chg / openValue) * 100).toFixed(3));

        const lastData = timeSeries[lastDateTime];
        if (lastData['4. close'] > this.lastCloseValue) {
          this.increase = true
        } else {
          this.increase = false
        }
        this.lastCloseValue = Number(lastData['4. close'].toFixed(3));
      }
    })
  }



}


