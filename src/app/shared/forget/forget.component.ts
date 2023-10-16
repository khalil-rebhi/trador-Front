import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  verif = false;
  reset = false;
  email : string;

  constructor (private userService : UserService) {}

  ngOnInit(): void {
  }

  handleReset(event : boolean){
    this.reset = !this.reset;
    this.verif = !this.verif;
  }

  submitEmail(){
    this.userService.sendEmail(this.email).subscribe();
    this.verif = !this.verif;
  }
}
