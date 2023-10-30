import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/models/Data';
import { DataSurveillanceService } from 'src/app/data-surveillance.service';

@Component({
  selector: 'app-data-surveillance',
  templateUrl: './data-surveillance.component.html',
  styleUrls: ['./data-surveillance.component.css']
})
export class DataSurveillanceComponent  implements OnInit{
  Data: Data[] = [];
  A:string = "A";

  constructor(private DataService: DataSurveillanceService) {}

  ngOnInit(): void {
    this.DataService.getData(this.A).subscribe((data) => {
      this.Data = data;
      console.log(data);
    });

   
  }

}
