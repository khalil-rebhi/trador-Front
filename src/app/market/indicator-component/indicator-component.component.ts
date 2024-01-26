import { Component, Input, OnInit } from '@angular/core';
import { SymboleStore } from '../../store/SymboleStore';
import { SideBarData } from '../../core/models/SideBarData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-indicator-component',
  templateUrl: './indicator-component.component.html',
  styleUrls: ['./indicator-component.component.css']
})
export class IndicatorComponentComponent implements OnInit {
  public symboleData: SideBarData;
  public gaugeValue: number;

  RsiValue: number;
  SmaValue: number;
  marketData : Observable<SideBarData[]>;
  @Input() symbole: string;
  @Input() market : string;
  Data: SideBarData;
  isBlinking: boolean = false;
  valueLabels: { [key: number]: string } = {
    10: 'Strong Sell',
    35: 'Sell',
    50: 'Neutral',
    75: 'Buy',
    90: 'Strong Buy'
  };

  RsiLabels: { [key: number]: string } = {
    0: 'Strong Sell',
    30: 'Neutre',
    70: 'Neutre',
    100: 'Strong Buy'
  };
  //@ViewChild('gauge') gauge: NgxGaugeModule;
  spinner = true;
  constructor(private readonly sideBarState: SymboleStore) {}

  ngOnInit(): void {
    switch (this.market) {
      case "forex":
        this.marketData =this.sideBarState.forex$
        break;
      case "stocks":
        this.marketData = this.sideBarState.stocks$;
        break;
      case "crypto" :
        this.marketData = this.sideBarState.crypto$;
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.updateData()
    }, 2000);
  }

  updateData() {
      this.marketData.subscribe(res => {
        this.symboleData = res.filter(sym => sym.symbol === this.symbole)[0]
        this.updateGaugeValue()
        this.updateRsiValue()
        this.updateSmaValue()
        this.spinner = false;
      });
  }

  toggleBlinking() {
    this.isBlinking = !this.isBlinking;
  }

  private updateGaugeValue() {
    if (this.symboleData?.buySignal === 'Buy' && this.symboleData.sellSignal === null) {
      this.gaugeValue = 35;
    }
    else if (this.symboleData.sellSignal === 'Sell' && this.symboleData.buySignal === null) {
      this.gaugeValue = 75;
    } else if (this.symboleData.buySignal === 'Strong Buy' && this.symboleData.sellSignal === null) {
      this.gaugeValue = 90; 
    } else if (this.symboleData.sellSignal === 'Strong Sell' && this.symboleData.buySignal === null) {
      this.gaugeValue = 10;
    } else {
      this.gaugeValue = 50;
    }
  }

  private updateRsiValue() {
    if (this.symboleData.rsiSignal === 'Strong Sell') {
      this.RsiValue = 35;
    } else if (this.symboleData.rsiSignal === 'Strong Buy' && this.symboleData.sellSignal === null) {
      this.RsiValue = 80; 
    } else {
      this.RsiValue = 50;
    }
  }

  private updateSmaValue() {
    if (this.symboleData.smaSignal === 'Strong Sell') {
      this.SmaValue = 35;
    } else if (this.symboleData.smaSignal === 'Strong Buy') {
      this.SmaValue = 80;

    } else {
      this.SmaValue = 50;
    }
  }

}
