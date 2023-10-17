import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import {  map, switchMap } from 'rxjs';
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
  public user : Client;
  spinner = true;


  ngOnInit(): void {
    this.store.pipe(
      map(result => result.user.user),
      switchMap(userId => this.clientService.getClient(userId))
    ).subscribe(result => {
      if (result) {
        this.user = result
        this.spinner = false;
      }
    });
  }
  

  constructor( private store : Store<any> ,private clientService:ClientService) {
  }

  updateClientProfile() {
    this.store.dispatch(update(this.user))
    this.store.pipe(
      map(result => result.user.user),
      switchMap(userId => this.clientService.getClient(userId))
    ).subscribe(result => {
      if (result) {
        this.user = result
      }
    });
  }

}
