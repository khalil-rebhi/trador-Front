import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideBarData } from 'src/app/core/models/SideBarData';
import { TraderComponentStore } from 'src/app/store/Trader.component-store';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-data-surveillance',
  standalone : true,
  imports : [CommonModule, SpinnerComponent],
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent implements OnInit {
  datas : SideBarData[];
  webSocket: WebSocket;
  spinner = true;
  increase = true;
  currentDate: string | null;






  constructor(private datePipe: DatePipe, private readonly tradeStore: TraderComponentStore) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = this.datePipe.transform(new Date(), 'EEEE dd MMMM yyyy HH:mm:ss');
    }, 1000);

    this.webSocket = new WebSocket("ws://localhost:8089/trador/sidebar");
    this.webSocket.onmessage = (event) => {
      this.spinner = false;
      this.datas = JSON.parse(event.data)
    }
  }



}


