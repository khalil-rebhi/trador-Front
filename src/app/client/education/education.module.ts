import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './course1/courses.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuizComponent } from './quiz/quiz.component';




@NgModule({
  declarations: [
    CoursesComponent,
    QuizComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
  ]
})
export class EducationModule {
  
}
