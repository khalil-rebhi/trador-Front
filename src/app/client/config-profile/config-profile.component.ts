import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import {  map, switchMap } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';
import { update } from 'src/app/store/actions/user.action';
@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.css']
})
export class ConfigProfileComponent  implements OnInit{
  selectedFile: File;
  public user : Client;
  spinner = false;
  private = false;
  showButton = "Show more";
  oldPassword : string;
  match = false;
  repeatPassword: string;
  password: string;
  showPassword : false;

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
  

  constructor( private store : Store<any> ,private clientService:ClientService, private datePipe : DatePipe, private userService : UserService) {
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

  showPrivate(){
    this.private = !this.private;
    if (this.private) {
      this.showButton = "Show less"
    }else{
      this.showButton = "Show more"
    }
  }

  checkPassword(){
    this.clientService.checkPassword(this.user,this.oldPassword)
      .subscribe(result => {
        if(result){
          this.match = true;
        }
      })
  }

  getFormattedDate(date : Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd')
  }

  comparePassword(){
    if (this.repeatPassword === this.user.password) {
      return true;
    }else{
      return false;
    }
  }

  hasUpperCase(input : string) : Boolean {
    return /[A-Z]/.test(input);
  }
  hasLowerCase(input : string) : Boolean {
    return /[a-z]/.test(input);
  }
  hasDigit(input : string) : Boolean {
    return /[0-9]/.test(input);
  }
  hasSpecialCharacters(input: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(input);
  }
  isPasswordLengthValid(input: string): boolean {
    return input.length >= 8 && input.length <= 24;
  }

  changePassword(){
    this.userService.resetPassword({email : this.user.email, newPass : this.password})
      .subscribe(result => console.log(result));
  }

  show(){
    this.showPassword != this.showPassword;
  }
}
