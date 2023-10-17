import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/core/models/Reclamation';
import { ClientService } from 'src/app/core/services/client.service';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit  {
  ngOnInit(): void {
    
  }

reclamation:Reclamation = new Reclamation();
constructor(private service:ClientService){}

submitReclamation(){
  this.service.addreclamation(this.reclamation).subscribe(
    Response =>{
    }
  )
}


}
