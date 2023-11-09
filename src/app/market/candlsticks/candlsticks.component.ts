import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { Data } from 'src/app/core/models/Data';
import { OrderBook } from 'src/app/core/models/OrderBook';
import { TraderComponentStore } from 'src/app/store/Trader.component-store';
import { User } from 'src/app/store/actions/user.action';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  title: any;
};

@Component({
  selector: 'app-candlsticks',
  templateUrl: './candlsticks.component.html',
  styleUrls: ['./candlsticks.component.css']
})
export class CandlsticksComponent implements OnInit {

  orderBookData: Data;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  selectedInterval: string = 'hour';
  spinner = true

  constructor(private readonly traderStore: TraderComponentStore) {
  }

  ngOnInit(): void {
    this.traderStore.trader$.subscribe(result => {
      this.orderBookData = result;
      const currentTimestamp = Date.now(); // Get the current timestamp
      const oneHourInMilliseconds = 60 * 60 * 1000 * 24 *2;
      if (this.orderBookData) {
        this.chartOptions = {
          series: [
            {
              name: "candle",
              data: this.formatData(this.orderBookData)
            }
          ],
          chart: {
            type: "candlestick",
            height: 350
          },
          xaxis: {
            type: "datetime",
            step : 60*1000,
            min : currentTimestamp - oneHourInMilliseconds,
            max : currentTimestamp
          },
          yaxis: [
            {
              opposite: true,
              tooltip: {
                enabled: true
              }
            }
          ],
        };
        this.spinner=false
      }
    });
  }

  formatData(data: Data): any[] {
    const timeSeries = data['Time Series (1min)'];

    return Object.keys(timeSeries).map(date => {
      const dailyData = timeSeries[date];
      return {
        x: new Date(date),
        y: [
          dailyData['1. open'],
          dailyData['4. close'],
          dailyData['2. high'],
          dailyData['3. low']
        ]
      };
    });
  }

onIntervalChange(interval: any) {
  if (interval) {
    this.selectedInterval = interval;
    this.updateXAxis();
  }
}

// Create a method to update xAxis configuration based on selected interval
updateXAxis() {
  let xAxisType: any;

  switch (this.selectedInterval) {
    case 'hour':
      xAxisType = {
        type: "datetime",
        min: Date.now() - (60 * 60 * 1000) , // Set min to one hour ago
        max: Date.now()
      };
      break;
    case 'minute':
      xAxisType = {
        type: "datetime",
        min: Date.now() - (60 * 1000) , // Set min to one hour ago
        max: Date.now()
      };
      break;
    case 'day':
      xAxisType = {
        type: "datetime",
        min: Date.now() - (60 * 60 * 1000 * 24), // Set min to one hour ago
        max: Date.now()
      };;
      break;
    case 'year':
      xAxisType = {
        type: "datetime",
        min: Date.now() - (60 * 60 * 1000 * 365), // Set min to one hour ago
        max: Date.now()
      };;
      break;
    default:
      xAxisType = 'datetime';
  }

  this.chartOptions = {
    ...this.chartOptions,
    xaxis: xAxisType
  };
}
}
