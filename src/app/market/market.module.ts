import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market.component';
import { DepthChartComponent } from './depth-chart/depth-chart.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CandlesComponent } from './candles/candles.component';
import { IgxFinancialChartModule, IgxLegendModule } from 'igniteui-angular-charts';


@NgModule({
  declarations: [
    MarketComponent,
    DepthChartComponent,
    OrderBookComponent,
    CandlesComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    NgApexchartsModule,
    SpinnerComponent,
    FormsModule,
    IgxFinancialChartModule,
    IgxLegendModule
  ]
})
export class MarketModule { }
