import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/Data';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.css']
})
export class CandlesComponent implements OnInit {
  public stocksData: any;
  public symbole : string;
  @Input() graphData : Data;
  constructor() {}

  ngOnInit(): void {
      this.stocksData = this.formatData(this.graphData);
  }

  formatData(data: Data): any[] {
    const timeSeries = data['Time Series (1min)'];

    return Object.keys(timeSeries).map(date => {
      const dailyData = timeSeries[date];
      return {
        "Date": new Date(date),
        "Open" :dailyData['1. open'],
        "High" : dailyData['2. high'],
        "Low"  : dailyData['3. low'],
        "Close" :  dailyData['4. close'],
        "Adj Close" : dailyData['4. close'],
        "Volume" : dailyData['5. volume']
      };
    });
  }


}
