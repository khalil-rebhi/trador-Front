import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/Data';
import { TraderComponentStore } from 'src/app/store/Trader.component-store';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.css']
})
export class CandlesComponent implements OnInit {
  public stocksData: any;
  public symbole : string;

  constructor(private readonly tradeStore : TraderComponentStore) {}

  ngOnInit(): void {
    this.tradeStore.trader$.subscribe(result=> {
      this.stocksData = this.formatData(result);
      this.symbole = result['Meta Data']['2. Symbol']
    })
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
