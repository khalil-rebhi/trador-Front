import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  standalone : true,
  imports : [CommonModule,RouterModule],
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent {

}
