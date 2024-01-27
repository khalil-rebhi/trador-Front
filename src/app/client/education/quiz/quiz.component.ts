import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent  {
  constructor(private router:Router){}
  toQuiz2(){
    this.router.navigateByUrl("trador/client/Quiz2")
  }
}
