import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market.component';
import { DepthChartComponent } from './depth-chart/depth-chart.component';
import { CandlsticksComponent } from './candlsticks/candlsticks.component';

const routes: Routes = [
  {path : '', component : MarketComponent, children:[
    {path: "candle" , component : CandlsticksComponent},
    {path: "depth" , component : DepthChartComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
