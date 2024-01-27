import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './course1/courses.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuizComponent } from './quiz/quiz.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { ResultatComponent } from './resultat/resultat.component';




@NgModule({
  declarations: [
    CoursesComponent,
    QuizComponent,
    Quiz2Component,
    ResultatComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
  ]
})
export class EducationModule {
  
}
