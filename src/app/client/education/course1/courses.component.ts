import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private router:Router){}


  toQuiz(){
    this.router.navigateByUrl("trador/client/Quiz")
  }
  

 



  
}
