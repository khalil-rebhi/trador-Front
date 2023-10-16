import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { ClientService } from 'src/app/core/services/client.service';
import { update } from 'src/app/store/actions/user.action';
@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.css']
})
export class ConfigProfileComponent  implements OnInit{
  selectedFile: File;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public user : Client;
  constructor( private store : Store<any> ,private clientService:ClientService) {
    this.store.subscribe(result => {this.user = result.user.user
    console.log(this.user)})
  }

  updateClientProfile() {
    this.store.dispatch(update(this.user))
  }


 
}
