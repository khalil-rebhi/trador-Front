import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.css']
})
export class Quiz2Component {
  constructor(private router:Router){}
  toQuiz(){
    this.router.navigateByUrl("trador/client/Quiz")
  }
  toResult(){
    this.router.navigateByUrl("trador/client/result")
  }
}
