import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { CoursesComponent } from './course1/courses.component';
import { EducationComponent } from './education.component';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';


export const educationroute:Routes=[{
  path: '', component: EducationComponent, children: [
    {
      path: 'course1', component: CoursesComponent,
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EducationRoutingModule { }
