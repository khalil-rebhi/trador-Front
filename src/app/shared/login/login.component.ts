import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { AuthService } from 'src/app/core/services/auth.service';
import { LOGIN, login, logout } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword : boolean = false;
  email : string;
  password : string;
  badCredentials : boolean = false;

  constructor(private authService: AuthService, private router : Router, private store: Store<{user : Client, accessToken : string}>) {
  }

  ngOnInit(): void {
  }

  show(){
    this.showPassword = !this.showPassword;
  }

  login(){
    this.store.dispatch(login({email : this.email, password: this.password}))
  }

}
