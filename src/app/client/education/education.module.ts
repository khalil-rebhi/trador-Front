import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  declarations: [
    CoursesComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
  ]
})
export class EducationModule {
  
}
