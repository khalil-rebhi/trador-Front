import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market.component';
import { DepthChartComponent } from './depth-chart/depth-chart.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { CandlsticksComponent } from './candlsticks/candlsticks.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SpinnerComponent } from '../shared/spinner/spinner.component';


@NgModule({
  declarations: [
    MarketComponent,
    DepthChartComponent,
    OrderBookComponent,
    CandlsticksComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    NgApexchartsModule,
    SpinnerComponent
  ]
})
export class MarketModule { }
