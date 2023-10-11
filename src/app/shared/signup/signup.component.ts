import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/core/services/user.service';
import { signup } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showPassword : boolean = false;
  repeatPassword : string;
  mdpValide : boolean;
  user : Client;
  address : string;
  city : string;
  state : string;
  zip : number;

  constructor(private userService: UserService, private store : Store ){
    this.user = new Client();
    this.user.password ='';
  }
  ngOnInit(): void {
  }

  show(){
    this.showPassword = !this.showPassword;
  }

  signup(){
    this.user.address = this.getAddress();
    this.user.createdAt = new Date();
    this.user.lastModifiedAt = new Date();
    this.store.dispatch(signup(this.user));
  }

  getAddress=() => this.address+" "+this.city+" "+this.state+" "+this.zip

  checkPassword(){
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

}
