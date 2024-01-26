import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { OrderBook } from 'src/app/core/models/OrderBook';
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
    








