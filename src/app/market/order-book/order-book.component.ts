import { Component,Input,ViewChild } from '@angular/core';
import { OrderBook } from 'src/app/core/models/OrderBook';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  title: any;
};
@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent {

  @Input() orderBookData: OrderBook ;

  constructor() {
  }

  placeBid(){

  }

  placeAsk(){

  }
}

///////////////////////////////
    








