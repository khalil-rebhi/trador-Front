import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SymbolData } from '../core/models/SymbolData';
import { SymboleStore } from '../store/SymboleStore';
import { SideBarData } from '../core/models/SideBarData';

@Component({
  selector: 'app-indicator-component',
  templateUrl: './indicator-component.component.html',
  styleUrls: ['./indicator-component.component.css']
})
export class IndicatorComponentComponent implements OnInit {
  private webSocket: WebSocket;
  public symboleData: SideBarData;
  public gaugeValue: number;
  RsiValue: number;
  SmaValue: number;
  @Input() symbole: string = "EUR";
  Data: SideBarData;
  isBlinking: boolean = false;
  valueLabels: { [key: number]: string } = {
    10: 'Strong Sell',
    35: 'Vendre',
    50: 'Neutre',
    75: 'Acheter',
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
  constructor(private readonly sideBarState: SymboleStore) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateData()
    }, 2000);
  }

  updateData() {
    setInterval(() => {
      this.sideBarState.forex$.subscribe(res => {
        this.symboleData = res.filter(sym => sym.symbol === this.symbole)[0]
        this.updateGaugeValue()
        this.updateRsiValue()
        this.updateSmaValue()
        this.spinner = false;
      });
    }, 10000)
  }

  toggleBlinking() {
    this.isBlinking = !this.isBlinking;
  }

  private updateGaugeValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.symboleData.buySignal === 'Buy' && this.symboleData.sellSignal === null) {
      // Logique pour le signal d'achat
      this.gaugeValue = 35;
    }
    else if (this.symboleData.sellSignal === 'Sell' && this.symboleData.buySignal === null) {
      // Logique pour le signal de vente
      this.gaugeValue = 75;
    } else if (this.symboleData.buySignal === 'Strong Buy' && this.symboleData.sellSignal === null) {
      this.gaugeValue = 90; // Adjust the gauge value for a strong buy
    } else if (this.symboleData.sellSignal === 'Strong Sell' && this.symboleData.buySignal === null) {
      this.gaugeValue -= 10;
    } else {
      // Logique pour d'autres scénarios
      this.gaugeValue = 50;
    }
  }

  private updateRsiValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.symboleData.rsiSignal === 'Strong Sell') {
      // Logique pour le signal d'achat
      this.RsiValue = 35;
    } else if (this.symboleData.rsiSignal === 'Strong Buy' && this.symboleData.sellSignal === null) {
      this.RsiValue = 80; // Adjust the gauge value for a strong buy

    } else {
      // Logique pour d'autres scénarios
      this.RsiValue = 50;
    }
  }

  private updateSmaValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.symboleData.smaSignal === 'Strong Sell') {
      // Logique pour le signal d'achat
      this.SmaValue = 35;
    } else if (this.symboleData.smaSignal === 'Strong Buy') {
      this.SmaValue = 80; // Adjust the gauge value for a strong buy

    } else {
      // Logique pour d'autres scénarios
      this.SmaValue = 50;
    }
  }

}
