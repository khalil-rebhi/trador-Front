import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/Course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
 

 

  constructor(private coursesService: CoursesService, private router :Router) { }

  courses: Course[] = [];
  idcourse: number = 1;

  ngOnInit(): void {
    this.getAllCourses();
  }


  getAllCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data; // Assignez les cours à la variable courses
        console.log(this.courses); // Facultatif : Affichez les cours dans la console
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  gotocourse(idcourse: number): void {
    this.coursesService.getCourseById(idcourse).subscribe(
      (data: Course) => {
        this.courses = [data]; // Vous pouvez vouloir assigner le cours à un tableau pour rester cohérent avec le type de courses
        console.log(this.courses);
      },
      error => {
        console.error('Error fetching course by ID:', error);
      }
    );
  }

}
