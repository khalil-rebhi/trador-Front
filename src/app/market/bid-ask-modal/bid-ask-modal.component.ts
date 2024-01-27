import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { staticOrderBook } from '../StaticOrderBook';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-bid-ask-modal',
  templateUrl: './bid-ask-modal.component.html',
  styleUrls: ['./bid-ask-modal.component.css'],
})
export class BidAskModalComponent {
  @Input() actionType: string = "Ask";
  @Input() symbole : string;
  
  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  };
  
  constructor(public activeModal: NgbActiveModal) {
    this.activeModal.update(this.modalOptions);
  }
  // Your modal component logic here...

  newOrder = { price: 0, quantity: 0, type: 'bid' }; // Default type is 'bid'

  submitOrder() {
    // Handle the submission of the new order
    console.log('New Order:', this.newOrder);
    // You can implement logic here to send the new order to your backend or update the order book.
    if (this.newOrder.type == 'bid') {
      staticOrderBook.bids.push({price : this.newOrder.price, amount : this.newOrder.quantity , timestamp : new Date().toISOString().slice(0, 16).replace('T', ' ') })
    }
    if (this.newOrder.type == 'ask') {
      staticOrderBook.asks.push({price : this.newOrder.price, amount : this.newOrder.quantity , timestamp : new Date().toISOString().slice(0, 16).replace('T', ' ') })
    }
  }

  setOrderType(type: 'ask' | 'bid') {
    this.actionType = type;
    this.newOrder.type = type;
  }
}