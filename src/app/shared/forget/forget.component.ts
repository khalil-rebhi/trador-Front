import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  verif = false;
  constructor (private userService : UserService) {}

  ngOnInit(): void {
  }

  email : string;

  submitEmail(){
    console.log(this.email);
    
    this.userService.sendEmail(this.email).subscribe(
      response => console.log("response :"+response)
    );
    this.verif = !this.verif;
  }
}
