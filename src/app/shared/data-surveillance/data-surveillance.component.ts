import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarData } from 'src/app/core/models/SideBarData';
import { TraderComponentStore } from 'src/app/store/Trader.component-store';

@Component({
  selector: 'app-data-surveillance',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent implements OnInit {
  data: SideBarData[];
  Data : SideBarData;
  TSLA: string = "TSLA";
  Google: string = "GOOGL";
  Total: string = "TTE";
  chg: any;
  chgPercent: number;
  lastCloseValue: number;
  refreshInterval: number = 5000;
  webSocket: WebSocket;
  increase = true;
  currentDate: string | null;






  constructor(private datePipe: DatePipe, private readonly tradeStore: TraderComponentStore) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'EEEE dd MMMM yyyy HH:mm:ss');
    }, 1000); // Update every 1 second

    this.webSocket = new WebSocket("ws://localhost:8089/trador/sidebar");
    this.webSocket.onmessage = (event) => {
      this.data = JSON.parse(event.data);
      this.Data = this.data[0];
      console.log(this.data);
      
    }
  }



}


