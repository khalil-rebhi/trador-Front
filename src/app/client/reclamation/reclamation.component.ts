import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/core/models/Reclamation';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit  {
  ngOnInit(): void {
    
  }

reclamation:Reclamation = new Reclamation();
constructor(private service:UserService){}

submitReclamation(){
  this.service.addreclamation(this.reclamation).subscribe(
    Response =>{
    }
  )
}


}
