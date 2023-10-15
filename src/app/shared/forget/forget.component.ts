import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  verif = false;

  ngOnInit(): void {
  }

  email : string;

  submitEmail(){
    console.log(this.email);
    
    this.verif = !this.verif;
  }
}
