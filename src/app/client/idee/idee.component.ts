import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-idee',
  templateUrl: './idee.component.html',
  styleUrls: ['./idee.component.css']
})
export class IdeeComponent implements OnInit{

  public user : Client;
  constructor( private store : Store<any>) {
    this.store.subscribe(result => this.user = result.user.user)
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
