import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { EducationComponent } from './education.component';
import { FormsModule } from '@angular/forms';


export const educationroute:Routes=[{
  path: '', component: EducationComponent, children: [
    {
      path: 'courses', component: CoursesComponent,
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
