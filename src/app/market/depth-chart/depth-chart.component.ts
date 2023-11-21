import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Order } from 'src/app/core/models/Order';
import { OrderBook } from 'src/app/core/models/OrderBook';

@Component({
  selector: 'app-depth-chart',
  templateUrl: './depth-chart.component.html',
  styleUrls: ['./depth-chart.component.css']
})
export class DepthChartComponent implements OnInit {
  @Input() orderBookData: OrderBook;
  chart: Highcharts.Chart;

  constructor(private el: ElementRef, private activatedRoute : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.setChart();
  }

  setChart() {
    const container = this.el.nativeElement.querySelector('#container');
    if (container && this.orderBookData) {
      const options: Highcharts.Options = {
        chart: {
          type: 'area',
          backgroundColor: 'transparent'
        },
        title: {
          text: ''
        },
        xAxis: {
          title: {
            text: 'Price'
          }
        },
        yAxis: {
          title: {
            text: 'Cumulative Quantity'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillOpacity: 0.3,
            lineWidth: 1,
            step: 'center'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size=10px;">Price: {point.x}</span><br/>',
          pointFormat: 'Cumulative Quantity: {point.y}'
        },
        series: [
          {
            name: 'Bids',
            type: 'area',
            data: this.calculateCumulative(this.orderBookData.bids),
            color: '#03a7a8'
          },
          {
            name: 'Asks',
            type: 'area',
            data: this.calculateCumulative(this.orderBookData.asks),
            color: '#fc5857'
          }
        ]
      };

      Highcharts.chart(container, options);
    }
  }

  calculateCumulative(orders: Order[]): number[][] {
    let cumulativeQuantity = 0;
    return orders
      .map(order => [order.price, cumulativeQuantity += order.amount])
      .sort((a, b) => a[0] - b[0]);
  }

}
