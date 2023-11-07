import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/Data';

@Component({
  selector: 'app-data-surveillance',
  standalone:true ,
  providers: [DatePipe],
  imports :[CommonModule, NgIf],
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent  implements OnInit{
  Data: Data;
  TSLA:string = "TSLA";
  Google :string ="GOOGL";
  Total : string ="TTE";
  chg : any ;
  chgPercent:number ;
  lastCloseValue : number ;
  refreshInterval: number = 5000;
  webSocket : WebSocket;
  increase = true;
  currentDate : string | null;



  
  

  constructor(private datePipe : DatePipe ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'EEEE dd MMMM yyyy HH:mm:ss');
    }, 1000); // Update every 1 second

    this.webSocket=new WebSocket("ws://localhost:8089/trador/ticker/TSLA");
    this.webSocket.onmessage=(event)=>{
      this.Data=JSON.parse(event.data)
      
      

      // Assurez-vous que la structure de données correspond à votre modèle Data
      const timeSeries = this.Data['Time Series (1min)'];
      const metaData = this.Data['Meta Data'];

        // Obtenez la première date disponible
        const dates = Object.keys(timeSeries);
        
        
        const firstDate = dates[0];
        const lastDateTime = dates[dates.length - 1];


          // Récupérez les valeurs de 'open' et 'close' pour la première date
      const openValue = timeSeries[firstDate]['1. open'];
      const closeValue = timeSeries[firstDate]['4. close'];

 // Calculez le changement (chg)
 this.chg =( closeValue - openValue).toFixed(3);

 // Calculez le pourcentage de changement (chg%)
this.chgPercent = Number(((this.chg / openValue) * 100).toFixed(3));

 const lastData = timeSeries[lastDateTime];
 if (lastData['4. close'] > this.lastCloseValue) {
  this.increase = true
}else{
   this.increase = false
 }
 this.lastCloseValue = Number(lastData['4. close'].toFixed(3));



  // Affichez les valeurs
  console.log(`Symbole: ${metaData['2. Symbol']}`);
  console.log(`Date: ${firstDate}`);
  console.log(`Chg: ${this.chg}`);
  console.log(`Chg%: ${this.chgPercent}%`);
  console.log(`Valeur de clôture la plus récente : ${this.lastCloseValue}`);




     
    }
    }
    

  }


