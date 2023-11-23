import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Data } from 'src/app/core/models/Data';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class CandlesComponent implements OnInit {
  public stocksData: any;
  public symbole : string;
  @Input() graphData : Data;
  public valueTooltip: TemplateRef<object>;

  constructor() {}

  ngOnInit(): void {
    this.updateStocksData();
  }

  private updateStocksData(){
    this.stocksData = this.formatData(this.graphData);
    this.stocksData.sort(this.compareDates);
  }

  ngOnChanges(){
    this.updateStocksData();
  }

  private compareDates(a: any, b: any): number {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
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