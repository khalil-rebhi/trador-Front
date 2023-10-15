import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/core/services/user.service';
import { login } from 'src/app/store/actions/user.action';

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
  spinner = true;
  loading = false;

  constructor(private authService: UserService, private router : Router, private store: Store<{user : Client, accessToken : string}>) {
  }

  ngOnInit(): void {
    setTimeout(() => this.spinner = !this.spinner,500)
  }

  show(){
    this.showPassword = !this.showPassword;
  }

  login(){
    this.loading = !this.loading;
    this.store.dispatch(login({email : this.email, password: this.password}))
  }

}
