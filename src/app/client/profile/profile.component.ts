import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/Client';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit  {
  ngOnInit(): void {
  }
  constructor(private router:Router){

  }

  toOrderBook(){
    this.router.navigateByUrl("/trador/client/orderBook")
    
  }
  
  toDepthChart(){
    this.router.navigateByUrl("/trador/client/depthChart")
    
  }

}

