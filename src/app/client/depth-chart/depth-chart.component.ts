






import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderBook } from 'src/app/core/models/OrderBook';

@Component({
  selector: 'app-depth-chart',
  templateUrl: './depth-chart.component.html',
  styleUrls: ['./depth-chart.component.css']
})
export class DepthChartComponent implements AfterViewInit {
  orderBookData: OrderBook;
  webSocket: WebSocket;
  chart: Highcharts.Chart; // A reference to the Highcharts chart

  constructor(private el: ElementRef) {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/orderBook/CRYPTO/BTCUSD');
    this.webSocket.onmessage = (event) => {
      this.orderBookData = JSON.parse(event.data);
      this.updateChart(); // Update the chart when new data arrives
   
    };
   
  }

  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('#container');

    if (container) {
      const options: Highcharts.Options = {
        chart: {
          type: 'area'
        },
        title: {
          text: 'ETH-BTC Market Depth'
        },
        // Other chart configuration options...

        series: [
          {
            name: 'Bids',
            type: 'area',
            data: [], // Initially empty, as we'll update it with data later
            color: '#03a7a8'
          },
          {
            name: 'Asks',
            type: 'area',
            data: [],
            color: '#fc5857'
          }
        ]
      };

      this.chart = Highcharts.chart(container, options);
      this.updateChart(); // Update the chart with the initial data
    }
  }

  updateChart() {
    if (this.chart && this.orderBookData) {
      const bidsData = this.orderBookData.bids.map(bid => [bid.price, bid.amount]);
      const asksData = this.orderBookData.asks.map(ask => [ask.price, ask.amount]);

      this.chart.series[0].setData(bidsData);
      this.chart.series[1].setData(asksData);
    }
  }

 
}




/*import { Component, AfterViewInit, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderBook } from 'src/app/core/models/OrderBook';

@Component({
  selector: 'app-depth-chart',
  templateUrl: './depth-chart.component.html',
  styleUrls: ['./depth-chart.component.css']
})
export class DepthChartComponent implements AfterViewInit {
  orderBookData: OrderBook ;
  webSocket: WebSocket;
  constructor(private el: ElementRef) {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/orderBook/CRYPTO/BTCUSD');
    this.webSocket.onmessage = (event) => {
      this.orderBookData = JSON.parse(event.data)
      console.log(this.orderBookData)
    };
   
  }
  
 
  
  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('#container');

    if (container) {
      const options: Highcharts.Options = {
        chart: {
          type: 'area'
        },
        title: {
          text: 'ETH-BTC Market Depth'
        },
        xAxis: {
          minPadding: 0,
          maxPadding: 0,
          plotLines: [
            {
              color: '#888',
              value: 0.1523,
              width: 1,
              label: {
                text: 'Actual price',
                rotation: 90
              }
            }
          ],
          title: {
            text: 'Price'
          }
        },
        yAxis: [
          {
            lineWidth: 1,
            gridLineWidth: 1,
           // title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
              align: 'left',
              x: 8
            }
          },
          {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineWidth: 0,
           // title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
              align: 'right',
              x: -8
            }
          }
        ],
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
          valueDecimals: 2
        },
        series: [
          {
            name: 'Bids',
            type: 'area', // Specify the type as 'area'
            data: this.orderBookData.bids.map(bid => [bid.price, bid.amount]);
            color: '#03a7a8'
          },
          {
            name: 'Asks',
            type: 'area', // Specify the type as 'area'
            data: [
              [0.1435, 242.521842],
              [0.1436, 206.498621],
              // Add more data points here...
            ],
            color: '#fc5857'
          }
        ]
      };

      Highcharts.chart(container, options);
    }
  }
}
*/