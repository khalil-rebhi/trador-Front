import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent {

  constructor(private store:Store<any> ) {
    
  }

  logout(){
    this.store.dispatch(logout());
  }
}
