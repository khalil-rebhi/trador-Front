import { DatePipe } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import {  map, switchMap } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
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
  birthDate : string | null;

  ngOnInit(): void {
    this.store.pipe(
      map(result => result.user.user),
      switchMap(userId => this.clientService.getClient(userId))
    ).subscribe(result => {
      if (result) {
        this.user = result
        console.log(this.user.userApplicationId);
        
        this.spinner = false;
        this.birthDate = this.getFormattedDate(this.user.birthDate);
      }
    });
  }
  

  constructor( private store : Store<any> ,private clientService:UserService, private datePipe : DatePipe, private userService : UserService) {
  }

  onBirthDateChange(newDate: any) {
    if(this.birthDate){
      let dateArray = this.birthDate?.split("-");
      let date = new Date();
      date.setFullYear(parseInt(dateArray[0]),parseInt(dateArray[1])-1,parseInt(dateArray[2]));
      this.user.birthDate = date;
    }
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
