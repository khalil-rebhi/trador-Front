import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SymbolData } from '../core/models/SymbolData';

@Component({
  selector: 'app-indicator-component',
  templateUrl: './indicator-component.component.html',
  styleUrls: ['./indicator-component.component.css']
})
export class IndicatorComponentComponent implements OnInit{
  private webSocket: WebSocket;
  private webSocketSubscription: Subscription;
  public symbole: string;
  public buySignal: string;
  public sellSignal: string;
  public smaSignal: string;
  public rsiSignal: string;
  public gaugeValue: number;
  public RsiValue: number;
  public SmaValue: number;
  Data: SymbolData ;
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

  constructor( ) {}

  ngOnInit(): void {
    this.webSocket = new WebSocket('ws://localhost:8089/trador/ticker/AAPL');

    this.webSocket.onmessage=(event)=>{
      this.Data=JSON.parse(event.data)
        this.Data = JSON.parse(event.data);
        console.log("data"+this.Data);
        this.symbole = event.data.symbol ;
        console.log(this.symbole);
        
         // Log each item in the array separately
    this.Data.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);

      // Access properties of each item
      this.buySignal = item.buySignal;
      console.log("buy signal", this.buySignal);

      this.sellSignal = item.sellSignal;
      console.log("sell signal", this.sellSignal);

      this.rsiSignal=item.rsiSignal;
      console.log("rsi signal" ,this.rsiSignal);

      this.smaSignal=item.smaSignal;
      console.log("sma signal" ,this.smaSignal);
      

      this.updateGaugeValue();
      this.updateRsiValue();
      this.updateSmaValue();
    }

    
    
    );
  }
    
   
  }
  toggleBlinking() {
    this.isBlinking = !this.isBlinking;
  }

  private updateGaugeValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.buySignal === 'Buy' && this.sellSignal === null) {
      // Logique pour le signal d'achat
      this.gaugeValue =35 ;
    }
     else if (this.sellSignal === 'Sell' && this.buySignal === null) {
      // Logique pour le signal de vente
      this.gaugeValue =75 ;
    }else if (this.buySignal === 'Strong Buy' && this.sellSignal === null) {
      this.gaugeValue = 90; // Adjust the gauge value for a strong buy
    } else if (this.sellSignal === 'Strong Sell' && this.buySignal === null) {
      this.gaugeValue -= 10;
    }else {
      // Logique pour d'autres scénarios
      this.gaugeValue =50 ;
    }
  }

  private updateRsiValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.rsiSignal === 'Strong Sell') {
      // Logique pour le signal d'achat
      this.RsiValue =35 ;
    }else if (this.rsiSignal === 'Strong Buy' && this.sellSignal === null) {
      this.RsiValue = 80; // Adjust the gauge value for a strong buy
   
    }else {
      // Logique pour d'autres scénarios
      this.RsiValue =50 ;
    }
  }

  private updateSmaValue() {
    // Ajoutez votre logique pour calculer la valeur du compteur en fonction des signaux d'achat et de vente
    // Vous pouvez ajuster la valeur du compteur (gaugeValue) en conséquence
    if (this.smaSignal === 'Strong Sell') {
      // Logique pour le signal d'achat
      this.SmaValue =35 ;
    }else if (this.smaSignal === 'Strong Buy') {
      this.SmaValue = 80; // Adjust the gauge value for a strong buy
   
    }else {
      // Logique pour d'autres scénarios
      this.SmaValue =50 ;
    }
  }

}
